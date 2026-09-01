import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'企业 AI 项目如何建立业务基线',description:'业务基线固定改造前的任务量、周期、质量、成本与结果口径，使 AI 项目改善可比较。',alternates:{canonical:'/knowledge/ai-project-baseline'}};
export default function Page(){return <MethodKnowledgePage eyebrow="方法 · 基线" title="没有基线，AI 项目只能证明系统上线，不能证明业务改善。" intro="企业 AI 项目的业务基线，是在改造前用固定口径记录任务量、周期、质量、人工投入、风险和最终业务结果。它必须来自真实历史样本，并能在部署后用同一口径重复计算。" description={metadata.description as string} path="/knowledge/ai-project-baseline" sections={[
  {title:'定义结果单位',detail:'明确按订单、询盘、工单、审批或决策计算，避免分母随项目变化。',output:'分析单位、时间窗和纳入排除规则。'},
  {title:'抽取历史样本',detail:'覆盖正常、困难、失败和高风险任务，保留来源与最终结果。',output:'带来源的基线样本集。'},
  {title:'记录多维指标',detail:'同时记录周期、准确性、返工、人工时间、成本、风险与业务结果。',output:'指标字典和原始数值。'},
  {title:'核验数据偏差',detail:'检查漏记、选择偏差、季节性、团队差异和口径变化。',output:'偏差说明与不可比较项。'},
  {title:'锁定复测规则',detail:'在部署前确定何时、由谁、用什么数据复测，避免事后挑选有利指标。',output:'复测时间、负责人和比较规则。'},
]} good={['项目声称要提效、降本、提质或降低风险。','流程已有历史记录或可以通过抽样重建。','需要在 MVD 结束时作继续、调整或停止决定。']} bad={['只衡量模型离线分数，却不关心工作流结果。','部署后才临时选择一个看起来改善的指标。','基线与结果使用不同人群、时间窗或统计口径。']} verification={['任何人按指标字典都能复算基线。','原始样本、清洗规则和排除项被保留。','上线后使用同一分析单位和口径比较。']} related={[{label:'建立评估集',href:'/knowledge/evaluation-set'},{label:'设计 MVD',href:'/knowledge/mvd-design'},{label:'使用决策评分器',href:'/tools/project-decision-scorer'}]}/>}
