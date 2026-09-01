import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'企业 AI 项目如何做生产验收',description:'生产验收同时检查业务结果、任务质量、系统可靠性、风险护栏、采用和交接。',alternates:{canonical:'/knowledge/production-acceptance'}};
export default function Page(){return <MethodKnowledgePage eyebrow="方法 · 生产验收" title="模型分数通过，不等于企业 AI 项目通过生产验收。" intro="企业 AI 生产验收必须同时证明六件事：业务结果可比较、真实任务质量达标、系统可靠运行、风险护栏有效、一线形成采用，以及企业能够接管。任何一项关键红线失败，都不能用平均分掩盖。" description={metadata.description as string} path="/knowledge/production-acceptance" sections={[
  {title:'验收业务结果',detail:'用部署前锁定的基线、时间窗和口径比较周期、质量、成本、风险或收入结果。',output:'业务结果表和差异说明。'},
  {title:'验收真实任务',detail:'运行固定评估集与新增真实样本，检查准确、完整、依据、拒绝和人工修改。',output:'任务级结果与错误分布。'},
  {title:'验收系统运行',detail:'检查延迟、可用性、成本、权限、日志、监控、异常与回退。',output:'运行报告和故障演练记录。'},
  {title:'验收风险红线',detail:'单独测试越权、错误承诺、敏感信息、不可逆动作和证据不足场景。',output:'红线测试与处置证据。'},
  {title:'验收采用与交接',detail:'确认真实用户持续使用、结果写回、负责人运转，并能独立维护常见事项。',output:'采用数据、运营清单和交接签收。'},
]} good={['MVD 准备进入正式生产或扩大范围。','项目需要用证据决定 GO、ADJUST、HOLD 或 STOP。','客户、交付方和使用团队需要统一完成标准。']} bad={['只做一次精心挑选的演示。','只验收功能清单，不看业务结果、风险和采用。','用整体平均分掩盖高风险场景或关键用户失败。']} verification={['六类验收均有负责人、样本、阈值和原始记录。','关键红线单独判定，不被其他指标抵消。','验收结论明确下一阶段范围、遗留风险和复查日期。']} related={[{label:'建立业务基线',href:'/knowledge/ai-project-baseline'},{label:'查看生产护栏',href:'/knowledge/production-guardrails'},{label:'查看案例证据标准',href:'/evidence/case-template'}]}/>}
