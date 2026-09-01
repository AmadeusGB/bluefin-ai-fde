import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'什么企业适合 FDE',description:'适合 FDE 的企业需要昂贵问题、真实数据、明确负责人、可控范围和结果压力。',alternates:{canonical:'/knowledge/fde-readiness'}};
export default function Page(){return <MethodKnowledgePage eyebrow="决策 · FDE 适配" title="不是所有企业都需要 FDE。五个条件同时成立，才值得进入现场。" intro="企业适合 FDE，不取决于规模或是否拥有 AI 团队，而取决于是否存在昂贵且反复发生的问题、可取得的真实数据、能够负责的业务负责人、可控制的首期范围，以及明确的结果压力。" description={metadata.description as string} path="/knowledge/fde-readiness" sections={[
  {title:'核算问题价值',detail:'确认损失、延迟、风险或机会成本正在发生，并能建立当前基线。',output:'问题陈述、损失口径与基线样本。'},
  {title:'核验真实数据',detail:'数据不必完美，但必须能取得、理解来源并与业务结果连接。',output:'数据样本、字段负责人和已知缺口。'},
  {title:'确认结果负责人',detail:'指定能调动流程、数据和一线人员，并对结果作出决定的业务负责人。',output:'负责人、参与者和决策权限。'},
  {title:'收紧首期范围',detail:'限制到一个流程、团队、区域或产品线，使两到六周内能够验证。',output:'首期边界、排除项和时间窗。'},
  {title:'设定决策门',detail:'在开发前约定 GO、ADJUST、HOLD、STOP 的证据条件。',output:'成功阈值、红线与下一步规则。'},
]} good={['问题每天或每周发生，损失能够被计算或排序。','真实数据和一线使用者能够进入验证。','企业愿意从一个最小闭环开始并接受停止决定。']} bad={['目标只是“展示 AI 能力”或追逐技术热度。','没有人对业务结果负责，数据也无法取得。','要求一次覆盖全集团，却不允许现场诊断和范围收缩。']} verification={['五个条件分别有负责人和书面证据。','任何关键条件缺失时，项目先调整或暂停而不是直接开发。','首期结果能够在固定时间窗内与基线比较。']} related={[{label:'完成适配度评估',href:'/diagnostic'},{label:'选择第一个项目',href:'/knowledge/how-to-choose-ai-project'},{label:'申请业务诊断',href:'/apply'}]}/>}
