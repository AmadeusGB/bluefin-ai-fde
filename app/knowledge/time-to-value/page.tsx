import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'企业 AI 项目如何衡量 TTV',description:'AI 项目 TTV 是从启动到首个可核验业务价值的时间，应分解为取数、验证、上线和采用。',alternates:{canonical:'/knowledge/time-to-value'}};
export default function Page(){return <MethodKnowledgePage eyebrow="决策 · Time to Value" title="TTV 不是 Demo 出现得多快，而是第一个业务价值何时被证据确认。" intro="企业 AI 项目的 Time to Value（价值实现时间）是从项目正式启动，到真实使用者在生产或受控真实流程中产生首个可核验业务价值的时间。它不以演示、模型接通或功能完成作为终点。" description={metadata.description as string} path="/knowledge/time-to-value" sections={[
  {title:'确定起点与价值事件',detail:'统一启动日期，并定义什么结果算首个价值，例如周期缩短、漏单减少或风险提前发现。',output:'起点、价值事件和证据要求。'},
  {title:'分解等待时间',detail:'分别记录取数、权限、接口、规则确认、评估、上线和用户采用时间。',output:'TTV 时间线和等待原因。'},
  {title:'优先最短闭环',detail:'减少首期系统、角色和数据源数量，但保留真实任务与结果写回。',output:'最小价值路径和排除项。'},
  {title:'记录首个与稳定价值',detail:'首个价值证明路径可能成立，稳定价值还需连续样本和采用证据。',output:'首值日期、稳定值窗口与样本量。'},
  {title:'用 TTV 改进交付',detail:'复盘最长等待和重复阻塞，把连接器、模板、评估集与审批规则沉淀为资产。',output:'交付改进项和可复用资产。'},
]} good={['需要比较不同 AI 项目的投入顺序。','项目周期长，但管理者不知道时间耗在哪里。','希望通过小范围部署更快取得真实反馈。']} bad={['把首次演示或模型 API 调通当作价值实现。','为了缩短时间删除评估、权限、审核或回退。','只报平均周期，不记录等待原因和稳定价值。']} verification={['起点、价值事件和证据口径在启动前确定。','时间线能够区分开发时间与等待、审批和采用时间。','首个价值来自真实任务，并能连接到业务结果。']} related={[{label:'设计最小可行部署',href:'/knowledge/mvd-design'},{label:'建立业务基线',href:'/knowledge/ai-project-baseline'},{label:'申请业务诊断',href:'/apply'}]}/>}
