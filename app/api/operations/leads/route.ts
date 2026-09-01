import { ensureSchema, getD1 } from "@/db";
import { authenticatedSiteUser } from "@/lib/site-auth";

const statuses = [
  "new",
  "reviewing",
  "qualified",
  "diagnostic_paid",
  "mvd",
  "won",
  "not_fit",
  "closed",
] as const;
const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

type Lead = {
  id: string;
  created_at: number;
  updated_at: number | null;
  name: string;
  company: string;
  contact: string;
  role: string;
  industry: string;
  problem: string;
  problem_frequency: string | null;
  annual_loss_range: string | null;
  data_readiness: string | null;
  owner_readiness: string | null;
  qualification_score: number | null;
  qualification_tier: string | null;
  diagnostic_score: number | null;
  decision: string | null;
  diagnostic_profile: string | null;
  source: string;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  acquisition_channel: string;
  status: string;
  owner_notes: string | null;
  next_action_at: number | null;
};

function csvCell(value: string | number | null) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: "需要登录后访问。" }, { status: 401 });
  await ensureSchema();
  const db = getD1();
  const leads = await db
    .prepare(
      `SELECT id,created_at,updated_at,name,company,contact,role,industry,problem,problem_frequency,annual_loss_range,data_readiness,owner_readiness,qualification_score,qualification_tier,diagnostic_score,decision,diagnostic_profile,source,landing_path,referrer,utm_source,utm_medium,utm_campaign,acquisition_channel,status,owner_notes,next_action_at FROM diagnostic_applications ORDER BY created_at DESC LIMIT 500`,
    )
    .all<Lead>();
  const rows = leads.results || [];
  if (new URL(request.url).searchParams.get("format") === "csv") {
    const columns: (keyof Lead)[] = [
      "id",
      "created_at",
      "updated_at",
      "name",
      "company",
      "contact",
      "role",
      "industry",
      "problem",
      "problem_frequency",
      "annual_loss_range",
      "data_readiness",
      "owner_readiness",
      "qualification_score",
      "qualification_tier",
      "diagnostic_score",
      "decision",
      "diagnostic_profile",
      "source",
      "landing_path",
      "referrer",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "acquisition_channel",
      "status",
      "owner_notes",
      "next_action_at",
    ];
    const csv = [
      columns.join(","),
      ...rows.map((row) =>
        columns.map((column) => csvCell(row[column])).join(","),
      ),
    ].join("\n");
    return new Response(`\uFEFF${csv}`, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": 'attachment; filename="bluefin-leads.csv"',
        "cache-control": "no-store",
      },
    });
  }
  const summary = statuses.reduce<Record<string, number>>((result, status) => {
    result[status] = rows.filter((lead) => lead.status === status).length;
    return result;
  }, {});
  return Response.json(
    { user: { email: user.email }, summary, leads: rows },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function PATCH(request: Request) {
  const user = authenticatedSiteUser(request.headers);
  if (!user)
    return Response.json({ error: "需要登录后访问。" }, { status: 401 });
  const body = (await request.json()) as Record<string, unknown>;
  const id = clean(body.id, 80),
    status = clean(body.status, 30),
    ownerNotes = clean(body.ownerNotes, 4000);
  const nextActionAt =
    Number.isFinite(Number(body.nextActionAt)) && Number(body.nextActionAt) > 0
      ? Math.round(Number(body.nextActionAt))
      : null;
  if (!id || !statuses.includes(status as (typeof statuses)[number]))
    return Response.json({ error: "线索或阶段无效。" }, { status: 400 });
  await ensureSchema();
  const result = await getD1()
    .prepare(
      "UPDATE diagnostic_applications SET status=?,owner_notes=?,next_action_at=?,updated_at=? WHERE id=?",
    )
    .bind(status, ownerNotes || null, nextActionAt, Date.now(), id)
    .run();
  if (!result.meta.changes)
    return Response.json({ error: "未找到该线索。" }, { status: 404 });
  return Response.json({ ok: true });
}
