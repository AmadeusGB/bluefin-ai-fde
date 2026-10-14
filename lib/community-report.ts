export function diagnosticReport(a: Record<string, string | string[]>) {
  const levels: Record<string, number> = {
    尚未开始: 0,
    员工个人尝试: 1,
    单部门试点: 2,
    多个部门使用: 3,
    已进入核心流程: 4,
    '资料分散，尚未整理': 0,
    已有电子文档: 1,
    已有结构化系统数据: 2,
    有明确的数据权限与质量规范: 3,
    尚未确定: 0,
    老板牵头: 1,
    有业务负责人: 2,
    业务与技术共同负责: 3,
  };
  const adoption = levels[String(a.aiAdoption)] ?? 0,
    data = levels[String(a.data)] ?? 0,
    owner = levels[String(a.owner)] ?? 0;
  const readiness =
    data >= 2 && owner >= 2 ? '可以进一步界定小范围试点' : '建议先补齐基础条件';
  const pains = Array.isArray(a.pains) ? a.pains : [];
  const options: Record<string, string> = {
    重复录入与报表: '报表汇总助手：先统一字段与计算口径，保留人工对账。',
    知识查找与传承:
      '企业知识助手：整理一组高频问题与原始资料，输出可追溯的来源。',
    客户跟进: '销售跟进助手：整理需求、生成跟进草稿，发送前由业务人员确认。',
    内容生产: '内容协作助手：建立品牌与素材规范，生成初稿后人工审核。',
    经营分析: '经营分析助手：在可靠数据上建立固定指标与解释，先核验计算。',
    流程审批: '流程辅助助手：归纳材料、提示缺项，保留原审批权限。',
    质量与交付: '交付知识助手：归纳标准和检查项，记录异常并由负责人复核。',
  };
  return `# ${String(a.company || '企业')} AI初步诊断\n\n生成日期：${new Date().toISOString().slice(0, 10)}\n\n> 基于您自填的问卷，采用透明规则生成。尚未访谈、核验数据或评估系统，不构成实施承诺或收益保证。\n\n## 当前判断\n${readiness}。企业当前处于“${String(a.aiAdoption)}”阶段，期望在${String(a.timeline)}看到首个成果。\n\n## 五个观察维度\n- AI应用基础：${String(a.aiAdoption)}（阶段 ${adoption}/4，并非行业排名）\n- 数据准备：${String(a.data)}\n- 组织责任：${String(a.owner)}\n- 目标清晰度：${Array.isArray(a.success) ? a.success.join('、') : String(a.success)}；仍需建立实际业务基线\n- 安全与部署：${String(a.security)}；需确认权限、接口及敏感信息范围\n\n## 优先探索的场景\n${pains
    .slice(0, 3)
    .map((p, i) => `${i + 1}. ${options[p] || p}`)
    .join(
      '\n',
    )}\n\n## 第一个试点建议\n围绕“${pains[0] || '一个高频业务问题'}”，选择一个部门、一个流程和一组代表性样本。${data < 2 ? '先整理资料、字段和权限。' : ''}${owner < 2 ? '先指定业务负责人和验收人员。' : ''}部署前先人工验证输出，预留失败回退方式。\n\n## 建议推进顺序\n1. 明确问题：核对实际流程、频次、耗时、差错与责任人。\n2. 小范围验证：用脱敏样本对比人工结果，记录准确性和遗漏。\n3. 受控试用：确认权限、人工复核、日志和异常回退。\n4. 决定是否扩展：根据实际使用和可核验指标复盘。各阶段时间需在访谈后确定。\n\n## 需要进一步核实\n业务量与耗时基线、数据样本质量、现有系统接口、试点负责人、预算口径、上线验收标准。问卷中的${String(a.budget)}预算与${String(a.timeline)}目标尚未经过可行性评估。\n\n蓝旗鱼科技｜企业AI内训与AI方案落地（FDE）\n`;
}
