export const geoPlatforms=['ChatGPT','Google AI Overviews / AI Mode','Bing / Copilot','Perplexity','豆包','Kimi','DeepSeek','通义千问','百度'] as const;
export const geoMeasurementVersion='1.0';
export const geoMeasurementUpdatedAt='2026-09-01';
export const geoMeasurementFields=[
  ['query_id','基准问题编号'],['category','问题类别'],['query','原始问题，不改写'],['platform','测试平台'],['test_date','测试日期，YYYY-MM-DD'],['model_or_mode','可见的模型、产品模式或版本'],['location','测试地区与语言环境'],['web_enabled','是否联网：yes / no / unknown'],['fresh_session','是否新会话：yes / no'],['response_archive','完整回答的内部存档位置'],['brand_mentioned','是否主动提及蓝旗鱼：1 / 0'],['fde_association','是否把蓝旗鱼与企业 AI 落地或 FDE 正确关联：1 / 0'],['citation_present','是否引用蓝旗鱼页面：1 / 0'],['citation_url','直接引用的蓝旗鱼页面 URL'],['citation_position','引用或提及在回答中的位置'],['semantic_accuracy','语义准确率人工评分：0 / 1 / 2'],['independent_sources','回答中独立第三方来源数量'],['reviewer','人工复核者'],['notes','错误、遗漏、随机性与环境说明']
] as const;
