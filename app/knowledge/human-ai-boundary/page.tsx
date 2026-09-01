import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'企业 AI 项目如何划分人机边界',description:'人机边界按检索、起草、建议、写回、执行与不可逆风险分级，明确审批、拒绝和升级。',alternates:{canonical:'/knowledge/human-ai-boundary'}};
export default function Page(){return <MethodKnowledgePage eyebrow="方法 · 人机责任" title="人机边界不是“AI 辅助、人来负责”八个字。它要精确到每一个动作。" intro="企业 AI 的人机边界应按任务和动作定义：AI 能读取什么、能生成什么、能写回哪里、能否执行、谁审批、证据不足时如何拒绝，以及发生例外时升级给谁。" description={metadata.description as string} path="/knowledge/human-ai-boundary" sections={[
  {title:'拆分任务动作',detail:'把流程拆成读取、检索、归纳、起草、建议、审批、写回和外部执行。',output:'动作清单与上下游影响。'},
  {title:'评估错误代价',detail:'判断错误是否可发现、可逆，以及是否影响资金、合同、安全、权限、客户或合规。',output:'风险等级和不可逆动作清单。'},
  {title:'分配自动化级别',detail:'低风险动作可自动，高风险动作要求人工确认，禁区动作不开放给 AI。',output:'自动、审核、禁止三级矩阵。'},
  {title:'定义拒绝与升级',detail:'当依据缺失、冲突、过期或超出权限时，系统必须拒绝并转给明确角色。',output:'拒绝条件、升级路径和响应要求。'},
  {title:'用日志复查边界',detail:'记录 AI 建议、人工修改、批准、执行和最终结果，持续调整自动化范围。',output:'审计日志和边界变更记录。'},
]} good={['AI 会生成外部答复、写回系统或触发后续动作。','任务包含金额、承诺、隐私、安全、合规或权限风险。','希望逐步扩大自动化，同时保持可审计和可回退。']} bad={['把所有责任留给用户，却不给来源、风险提示和审核工具。','所有动作一律人工确认，且不按风险分层。','边界只写在制度文件中，系统权限和工具并未限制。']} verification={['每个系统动作都有允许条件、审批人和失败路径。','高风险与不可逆动作不能绕过权限和审批。','日志能还原 AI、人工和最终执行之间的责任链。']} related={[{label:'查看生产护栏',href:'/knowledge/production-guardrails'},{label:'建立评估集',href:'/knowledge/evaluation-set'},{label:'使用 MVD 设计器',href:'/tools/mvd-designer'}]}/>}
