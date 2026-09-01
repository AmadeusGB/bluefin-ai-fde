import type { Metadata } from 'next';
import { MethodKnowledgePage } from '@/components/method-knowledge-page';
export const metadata:Metadata={title:'企业 AI 业务诊断怎么做',description:'企业 AI 业务诊断从损失事实出发，核验流程、数据、责任、风险与最小部署边界。',alternates:{canonical:'/knowledge/ai-business-diagnostic'}};
export default function Page(){return <MethodKnowledgePage eyebrow="方法 · 业务诊断" title="AI 业务诊断先找损失，再谈模型。" intro="企业 AI 业务诊断不是收集功能愿望，而是进入真实流程，用访谈、数据样本和现场观察核验损失如何发生、谁在处理、依据在哪里、风险是什么，以及哪个最小闭环值得进入 MVD。" description={metadata.description as string} path="/knowledge/ai-business-diagnostic" sections={[
  {title:'从异常事件取样',detail:'选择最近真实发生的订单、客诉、审批、询盘或决策，不从理想流程开始。',output:'可追溯事件样本与损失事实。'},
  {title:'还原原始流程',detail:'记录触发、角色、系统、等待、返工、判断依据和结果写回。',output:'当前流程与关键断点。'},
  {title:'核验数据证据',detail:'查看原始记录、版本、权限、缺失与结果标签，不接受“系统里应该有”。',output:'数据地图和可用性结论。'},
  {title:'确认责任与风险',detail:'明确谁审批、谁承担错误、哪些动作不可自动化、何时必须升级。',output:'责任地图与风险红线。'},
  {title:'形成诊断决定',detail:'估算价值、可行性和采用条件，输出 MVD 范围或调整、暂停、停止建议。',output:'诊断报告、证据清单和决策门。'},
]} good={['企业知道哪里痛，但尚不能把问题写成可验收项目。','流程跨越多人和系统，损失原因存在争议。','计划投入开发前，需要验证数据、责任和采用条件。']} bad={['只需要标准软件选型或通用工具培训。','不允许查看真实样本，只能听管理者描述。','诊断结论无论如何都必须支持既定采购决定。']} verification={['每个重要判断都能回到事件、数据或访谈证据。','诊断清楚区分事实、假设、缺口和待验证项。','最终范围同时写明做什么、不做什么和停止条件。']} related={[{label:'使用五张地图',href:'/tools/five-maps'},{label:'阅读五张地图方法',href:'/knowledge/five-maps-method'},{label:'申请现场诊断',href:'/apply'}]}/>}
