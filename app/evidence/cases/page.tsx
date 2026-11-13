import Link from 'next/link';
import { WorldShell } from '@/components/world/shell';
import { publicCaseSummaries } from '@/lib/public-copy';
export const metadata = {
  title: '企业AI项目摘要与交付路径',
  description:
    '蓝旗鱼科技既有脱敏记录的公开摘要：退货归因、产品情报、销售跟进和报价审批的问题、实施路径与验收边界。',
  alternates: { canonical: '/evidence/cases' },
};
export default function Page() {
  return (
    <WorldShell>
      <div className="page-heading">
        <p className="micro accent">PUBLIC PROJECT NOTES</p>
        <h1>
          先看业务问题，
          <br />
          再看实施路径。
        </h1>
        <p className="intro">
          从四篇既有脱敏项目记录中，了解企业AI可以介入哪些流程、需要哪些条件，以及如何设计验收。
        </p>
      </div>
      <p className="notice">
        来源：站内既有脱敏项目记录，原页注明依据内部项目演讲材料整理。公开材料未提供完整客户授权证言及部署后的量化结果，因此这里不宣称降本或增收幅度。体验站内另有三份模拟案例，不能作为客户交付背书。
      </p>
      <div className="public-reading">
        {publicCaseSummaries.map((item) => (
          <article className="case-summary" key={item.slug}>
            <p className="micro accent">{item.context} · 既有记录摘要</p>
            <h2>{item.title}</h2>
            <dl>
              <dt>业务问题</dt>
              <dd>{item.problem}</dd>
              <dt>实施路径</dt>
              <dd>{item.approach}</dd>
              <dt>验收与边界</dt>
              <dd>{item.validation}</dd>
            </dl>
            <Link className="text-link" href={`/evidence/cases/${item.slug}`}>
              阅读原始公开记录 →
            </Link>
          </article>
        ))}
        <section className="public-reading">
          <h2>公开摘要与会员资料有什么区别？</h2>
          <p>
            这里的摘要与原始公开记录均无需登录。完整课件及会员下载资料按板块授权，客户内部文档与个人资料不公开。企业会员在体验站下载的三份模拟案例均带有演示标记，不代表这四篇记录的项目附件。
          </p>
          <div className="auth-links">
            <Link href="/services">了解内训与FDE服务 →</Link>
            <Link href="/apply">提交企业需求 →</Link>
          </div>
        </section>
      </div>
    </WorldShell>
  );
}
