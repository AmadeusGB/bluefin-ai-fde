import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { companyDescription, serviceQuestions } from '@/lib/public-copy';
export const metadata = {
  title: '企业AI内训与AI方案落地',
  description: companyDescription,
  alternates: { canonical: '/services' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">BUILT FOR YOUR BUSINESS</p>
        <h1>
          从学会AI，
          <br />
          到用AI做成事。
        </h1>
        <p className="intro">{companyDescription}</p>
      </div>
      <div className="service-editorial">
        <article>
          <span className="micro accent">ENTERPRISE TRAINING</span>
          <h2>企业AI内训</h2>
          <p>围绕团队岗位与业务场景，建立AI认知、工具使用和实践能力。</p>
          <ul>
            <li>了解团队基础与培训目标</li>
            <li>结合岗位设计课程和练习</li>
            <li>通过实操识别可继续推进的场景</li>
          </ul>
          <Link className="primary-button" href="/training">
            了解内训内容 <ArrowUpRight size={18} />
          </Link>
        </article>
        <article>
          <span className="micro accent">FORWARD DEPLOYED ENGINEERING</span>
          <h2>企业AI方案落地</h2>
          <p>
            以FDE方式进入业务现场，围绕具体问题推进需求梳理、方案设计、实施和交接。
          </p>
          <ul>
            <li>梳理业务问题、数据与责任人</li>
            <li>限定试点范围，验证关键能力</li>
            <li>部署、使用反馈与后续迭代</li>
          </ul>
          <Link className="primary-button" href="/fde">
            了解FDE方法 <ArrowUpRight size={18} />
          </Link>
        </article>
      </div>
      <section className="public-reading">
        <p className="micro accent">HOW WE WORK</p>
        <h2>从业务问题，到可确认的交付。</h2>
        <ol>
          <li>
            <strong>说明现状。</strong>
            明确团队岗位、重复任务、现有流程和希望改善的问题。
          </li>
          <li>
            <strong>确认路径。</strong>
            以能力建设为主时先做内训；涉及企业数据、系统与流程时进入FDE需求梳理。
          </li>
          <li>
            <strong>约定范围。</strong>
            确认课程或试点范围、交付物、双方责任、费用与验收方式。
          </li>
          <li>
            <strong>实施与复查。</strong>
            对照约定目标检查学习产出或试点结果，再决定下一阶段。
          </li>
        </ol>
        <div className="auth-links">
          <Link href="/evidence/cases">查看公开项目摘要 →</Link>
          <Link href="/events">查看课程与沙龙记录 →</Link>
        </div>
      </section>
      <section className="faq-block">
        <h2>企业开始之前，常问的八个问题</h2>
        {serviceQuestions.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <div className="diagnostic-callout">
        <div>
          <h2>先找到适合你的第一步。</h2>
          <p>
            填写企业问卷，获取一份免费的企业AI初步诊断。正式方案、周期和费用在需求确认后另行确定。
          </p>
        </div>
        <Link href="/join?section=enterprise" className="primary-button">
          加入并获取诊断 <ArrowRight size={18} />
        </Link>
      </div>
      <Link href="/apply" className="text-link">
        直接提交企业需求，不加入联盟 <ArrowUpRight size={17} />
      </Link>
    </WorldShell>
  );
}
