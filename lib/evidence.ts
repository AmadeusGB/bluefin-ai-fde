export const evidenceSections = [
  {
    key: 'clientBackground',
    column: 'client_background',
    label: '客户背景',
    hint: '行业、组织范围、业务负责人及项目上下文。',
  },
  {
    key: 'originalProcess',
    column: 'original_process',
    label: '原始流程',
    hint: '上线前的角色、系统、等待点和例外路径。',
  },
  {
    key: 'quantifiedLoss',
    column: 'quantified_loss',
    label: '可量化损失',
    hint: '时间、收入、错误率、机会成本或风险的计算方式与基线。',
  },
  {
    key: 'dataScope',
    column: 'data_scope',
    label: '证据与数据范围',
    hint: '来源、样本量、时间范围、权限和质量限制。',
  },
  {
    key: 'whyOrdinaryFailed',
    column: 'why_ordinary_failed',
    label: '普通方案为何无效',
    hint: '标准 SaaS、培训、规则自动化或既有项目无法闭环的原因。',
  },
  {
    key: 'diagnosis',
    column: 'diagnosis',
    label: '现场诊断',
    hint: '问题、流程、数据、责任与风险五张地图的关键判断。',
  },
  {
    key: 'mvdScope',
    column: 'mvd_scope',
    label: 'MVD 范围',
    hint: '首个最小可行部署包含什么、不包含什么。',
  },
  {
    key: 'humanSystemBoundary',
    column: 'human_system_boundary',
    label: '系统与人工边界',
    hint: 'AI 自动处理、人工审核、回退和拒绝处理的位置。',
  },
  {
    key: 'baselineResults',
    column: 'baseline_results',
    label: '基线与结果',
    hint: '使用相同口径对比部署前后，并说明统计周期。',
  },
  {
    key: 'risksLimitations',
    column: 'risks_limitations',
    label: '风险与限制',
    hint: '失败场景、未覆盖范围、外部依赖与不确定性。',
  },
  {
    key: 'handover',
    column: 'handover',
    label: '客户如何接管',
    hint: '权限、文档、培训、监控与 30/60/90 天复查方式。',
  },
  {
    key: 'reusableAssets',
    column: 'reusable_assets',
    label: '可复用资产',
    hint: '可以合法复用的数据结构、评估集、模板和模块。',
  },
] as const;
export const evidenceLevels = [
  ['verified', '已验证案例'],
  ['anonymized', '脱敏案例'],
  ['delivery', '真实交付记录'],
  ['internal', '内部实践'],
  ['prototype', '演示原型'],
  ['hypothesis', '待验证假设'],
] as const;
export const evidenceStatuses = [
  ['draft', '草稿'],
  ['review', '待复核'],
  ['approved', '已批准'],
  ['hold', '暂停'],
] as const;
export type EvidenceSectionKey = (typeof evidenceSections)[number]['key'];
