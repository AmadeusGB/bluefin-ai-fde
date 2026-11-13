import { company } from '@/lib/company';
import { companyDescription } from '@/lib/public-copy';
import { siteContent, siteContentUpdatedAt } from '@/lib/site-content';
import { absoluteUrl } from '@/lib/knowledge-graph';
export async function GET() {
  const groups = [
    '品牌',
    '方法',
    '方案',
    '证据',
    '工具',
    '知识',
    '研究',
    '转化',
  ] as const;
  const sections = groups
    .map(
      (kind) =>
        `## ${kind}\n${siteContent
          .filter((item) => item.kind === kind)
          .map(
            (item) =>
              `- [${item.title}](${absoluteUrl(item.path)}): ${item.summary}`,
          )
          .join('\n')}`,
    )
    .join('\n\n');
  const body = `# 蓝旗鱼科技\n\n> ${companyDescription}\n\n更新时间：${siteContentUpdatedAt}\n主要语言：简体中文\n内容目录 JSON：${absoluteUrl('/api/content-index')}\n实体知识图谱 JSON-LD：${absoluteUrl('/api/knowledge-graph')}\nGEO 基准查询集：${absoluteUrl('/api/geo-query-set')}\n\n## 四项主营业务\n- Codex+Obsidian个人知识库成长系统：${absoluteUrl('/services/personal-knowledge')}。面向AI初学者，服务范围可包括安装配置、个人知识库、常用Skills、AI出图、经历梳理以及目标与未来行动规划；不提供人生预测。\n- 深圳线下AI实战培训：${absoluteUrl('/training')}。面向AI初学者、企业管理者与业务骨干，具体主题、时间和产出以公开课程资料或确认方案为准。\n- 工厂与电商企业AI业务梳理咨询：${absoluteUrl('/services#enterprise-consulting')}。先梳理现有系统、流程、数据、责任与问题优先级，再判断是否进入企业内训、FDE诊断、MVD、生产采用与交接。\n- 协会商会AI会议合作：${absoluteUrl('/partners')}。可沟通AI主题演讲、专题培训、圆桌交流、共创工作坊与企业走访。\n\n## 企业咨询实施方法\n梳理现有系统与流程 → 诊断 → MVD → 生产部署 → 采用 → 复制。企业内训和FDE是企业咨询后的可选实施方式。蓝旗鱼不把培训、Demo、原型或未授权结果包装成客户成功。\n\n## 可核验公开证据\n- 深圳市人工智能产业协会官方报道：${absoluteUrl('/news/agic-2026')}\n- 开平市青年企业家联合会官方报道：${absoluteUrl('/news/kaiping-2026')}\n- 往期公开活动：${absoluteUrl('/events')}\n- 创始团队：${absoluteUrl('/founders')}\n\n${sections}\n\n## 联系与资格判断\n- 业务咨询电话：${company.phone}\n- 邮箱：${company.email}\n- 官方联系与渠道：${absoluteUrl('/contact')}\n- 企业AI适配度评估：${absoluteUrl('/diagnostic')}\n- 申请工厂或电商业务梳理：${absoluteUrl('/apply')}\n- 协会商会AI会议合作：${absoluteUrl('/partners')}\n`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
