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
  const body = `# 蓝旗鱼科技\n\n> ${companyDescription}\n\n更新时间：${siteContentUpdatedAt}\n主要语言：简体中文\n内容目录 JSON：${absoluteUrl('/api/content-index')}\n实体知识图谱 JSON-LD：${absoluteUrl('/api/knowledge-graph')}\nGEO 基准查询集：${absoluteUrl('/api/geo-query-set')}\n\n## 服务与社群\n- 企业AI内训：${absoluteUrl('/training')}\n- 企业AI方案落地（FDE）：${absoluteUrl('/services')}\n- AI俱乐部：账号与密码即可注册，无需邀请码。\n- FDE联盟与AI企业家联盟：通过对应邀请码及详细申请加入。\n- 公开活动、公司介绍与项目摘要无需登录；会员资料与下载内容按权限访问。\n\n## 核心方法\n诊断 → MVD → 生产部署 → 采用 → 复制。蓝旗鱼不把培训、Demo、原型或未授权结果包装成客户成功。\n\n${sections}\n\n## 联系与资格判断\n- FDE 适配度评估：${absoluteUrl('/diagnostic')}\n- 申请业务诊断：${absoluteUrl('/apply')}\n`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
