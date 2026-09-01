import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'企业如何管理 AI 项目组合',description:'AI 项目组合按价值、可行性、风险、采用与复用排序，并用统一决策门停止低价值项目。',alternates:{canonical:'/knowledge/ai-project-portfolio'}};
export default function Page(){return <MethodKnowledgePage eyebrow="决策 · 项目组合" title="企业不缺 AI 想法，缺的是统一排序和停止机制。" intro="企业 AI 项目组合管理，是用同一套价值、数据、负责人、风险、采用和复用标准比较候选项目，分阶段投入资源，并在证据不足时及时调整、暂停或停止。它防止每个部门都做 Demo，却没有项目进入生产。" description={metadata.description as string} path="/knowledge/ai-project-portfolio" sections={[
  {title:'建立候选问题池',detail:'以业务损失和机会为单位收集候选项，不以工具、模型或部门愿望命名。',output:'问题、负责人、损失和数据来源。'},
  {title:'统一初筛标准',detail:'按价值、数据、负责人、范围、风险、采用和复用评分，并设置关键红线。',output:'可比较评分和淘汰原因。'},
  {title:'分配探索阶段',detail:'把候选项放入诊断、PoC、MVD、生产或复制阶段，避免一次性承诺全部预算。',output:'阶段组合与本期资源上限。'},
  {title:'运行统一决策门',detail:'每个阶段用预先约定证据决定 GO、ADJUST、HOLD 或 STOP。',output:'阶段决定、证据和下一笔投入。'},
  {title:'衡量组合产出',detail:'除项目结果外，统计 TTV、案例授权、资产复用、采用与停止效率。',output:'组合看板和季度复盘。'},
]} good={['多个部门提出大量 AI 场景，资源无法同时满足。','企业已有多个 PoC，但生产采用和业务结果不足。','希望将项目经验沉淀为共享连接器、评估集和行业资产。']} bad={['按部门级别或技术热度直接分配预算。','项目只允许启动、不允许基于证据停止。','每个项目使用完全不同的价值和验收口径。']} verification={['所有候选项使用同一字段和决策门。','每笔新增投入都能对应上一阶段的证据。','季度复盘同时记录成功、调整、暂停、停止和复用结果。']} related={[{label:'使用项目决策评分器',href:'/tools/project-decision-scorer'},{label:'判断 FDE 适配度',href:'/knowledge/fde-readiness'},{label:'衡量项目 TTV',href:'/knowledge/time-to-value'}]}/>}
