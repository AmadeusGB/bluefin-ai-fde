import { ensureSchema, getD1 } from '@/db';
import { decodeDiagnosticProfile, diagnosticResult } from '@/lib/diagnostic';

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
function acquisitionChannel(utmSource: string, referrer: string) {
  if (utmSource) return 'utm';
  if (!referrer) return 'direct';
  try {
    const hostname = new URL(referrer).hostname.toLowerCase();
    const channels: [string, string][] = [
      ['chatgpt.com', 'chatgpt'],
      ['openai.com', 'chatgpt'],
      ['google.', 'google'],
      ['bing.com', 'bing'],
      ['perplexity.ai', 'perplexity'],
      ['baidu.com', 'baidu'],
      ['doubao.com', 'doubao'],
      ['kimi.com', 'kimi'],
      ['moonshot.cn', 'kimi'],
      ['deepseek.com', 'deepseek'],
      ['tongyi.com', 'tongyi'],
      ['qwen.ai', 'tongyi'],
    ];
    return (
      channels.find(
        ([domain]) =>
          hostname === domain ||
          hostname.endsWith(`.${domain}`) ||
          hostname.includes(domain),
      )?.[1] || 'referral'
    );
  } catch {
    return 'referral';
  }
}
const qualificationPoints = {
  problemFrequency: { daily: 20, weekly: 15, monthly: 8, occasional: 0 },
  annualLossRange: {
    over_200w: 30,
    '50w_200w': 25,
    '10w_50w': 15,
    under_10w: 5,
    unknown: 0,
  },
  dataReadiness: { ready: 25, partial: 15, unknown: 5, unavailable: 0 },
  ownerReadiness: { committed: 25, identified: 15, candidate: 8, none: 0 },
} as const;

function validOption<T extends Record<string, number>>(value: string, map: T) {
  return value in map ? (value as keyof T) : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (clean(body.website, 100))
      return Response.json({ ok: true }, { status: 201 });
    const name = clean(body.name, 80),
      company = clean(body.company, 120),
      contact = clean(body.contact, 160),
      role = clean(body.role, 80),
      industry = clean(body.industry, 80),
      problem = clean(body.problem, 2000);
    const consent = body.consent === true;
    let diagnosticScore = Number.isFinite(Number(body.diagnosticScore))
      ? Math.max(0, Math.min(100, Math.round(Number(body.diagnosticScore))))
      : null;
    let decision = ['GO', 'ADJUST', 'HOLD', 'STOP'].includes(
      clean(body.decision, 12),
    )
      ? clean(body.decision, 12)
      : null;
    const source = clean(body.source, 40) || 'website';
    const problemFrequency = validOption(
        clean(body.problemFrequency, 20),
        qualificationPoints.problemFrequency,
      ),
      annualLossRange = validOption(
        clean(body.annualLossRange, 20),
        qualificationPoints.annualLossRange,
      ),
      dataReadiness = validOption(
        clean(body.dataReadiness, 20),
        qualificationPoints.dataReadiness,
      ),
      ownerReadiness = validOption(
        clean(body.ownerReadiness, 20),
        qualificationPoints.ownerReadiness,
      );
    const qualificationComplete =
      problemFrequency && annualLossRange && dataReadiness && ownerReadiness;
    const qualificationScore = qualificationComplete
      ? qualificationPoints.problemFrequency[problemFrequency] +
        qualificationPoints.annualLossRange[annualLossRange] +
        qualificationPoints.dataReadiness[dataReadiness] +
        qualificationPoints.ownerReadiness[ownerReadiness]
      : null;
    const qualificationTier =
      qualificationScore == null
        ? null
        : qualificationScore >= 75
          ? 'A'
          : qualificationScore >= 50
            ? 'B'
            : 'C';
    const profileCandidate = clean(body.diagnosticProfile, 3);
    const diagnosticProfile = /^[0-9a-f]{1,3}$/i.test(profileCandidate)
      ? profileCandidate.toLowerCase()
      : null;
    if (diagnosticProfile) {
      const selected = decodeDiagnosticProfile(diagnosticProfile);
      diagnosticScore = Math.round(
        (selected.filter(Boolean).length / selected.length) * 100,
      );
      decision = diagnosticResult(diagnosticScore).decision;
    }
    const landingPath = clean(body.landingPath, 500),
      referrer = clean(body.referrer, 1000),
      utmSource = clean(body.utmSource, 120),
      utmMedium = clean(body.utmMedium, 120),
      utmCampaign = clean(body.utmCampaign, 200),
      utmContent = clean(body.utmContent, 200),
      utmTerm = clean(body.utmTerm, 200);
    const channel = acquisitionChannel(utmSource, referrer);
    if (
      !name ||
      !company ||
      !contact ||
      !role ||
      !industry ||
      problem.length < 20 ||
      !consent ||
      (source !== 'privacy-request' && !qualificationComplete)
    )
      return Response.json(
        { error: '请完整填写必填项并确认隐私授权。' },
        { status: 400 },
      );
    await ensureSchema();
    const id = crypto.randomUUID(),
      now = Date.now(),
      db = getD1();
    const statements = [
      db
        .prepare(
          `INSERT INTO diagnostic_applications (id,created_at,name,company,contact,role,industry,problem,problem_frequency,annual_loss_range,data_readiness,owner_readiness,qualification_score,qualification_tier,diagnostic_score,decision,diagnostic_profile,source,landing_path,referrer,utm_source,utm_medium,utm_campaign,utm_content,utm_term,acquisition_channel,consent_at,privacy_policy_version,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        )
        .bind(
          id,
          now,
          name,
          company,
          contact,
          role,
          industry,
          problem,
          problemFrequency,
          annualLossRange,
          dataReadiness,
          ownerReadiness,
          qualificationScore,
          qualificationTier,
          diagnosticScore,
          decision,
          diagnosticProfile,
          source,
          landingPath || null,
          referrer || null,
          utmSource || null,
          utmMedium || null,
          utmCampaign || null,
          utmContent || null,
          utmTerm || null,
          channel,
          now,
          '2026-09-01-v1.2',
          'new',
        ),
    ];
    if (source !== 'privacy-request') {
      const eventDate = new Date(now).toISOString().slice(0, 10),
        eventLandingPath = landingPath.startsWith('/')
          ? landingPath.split('?')[0]
          : '/apply';
      statements.push(
        db
          .prepare(
            `INSERT INTO funnel_events (event_date,event_name,source,landing_path,count,updated_at) VALUES (?,'application_submitted',?,?,1,?)
             ON CONFLICT(event_date,event_name,source,landing_path) DO UPDATE SET count=count+1,updated_at=excluded.updated_at`,
          )
          .bind(eventDate, source, eventLandingPath, now),
      );
    }
    await db.batch(statements);
    return Response.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error('diagnostic application failed', error);
    return Response.json(
      { error: '暂时无法提交，请稍后重试。' },
      { status: 500 },
    );
  }
}
