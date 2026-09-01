export const diagnosticGroups = [
  {
    key: 'value',
    label: '问题价值',
    questions: [
      '问题造成持续、可观察的时间或收入损失',
      '当前损失足以支持一项小范围部署',
      '成功可以用一到两个业务指标核验',
    ],
    action: '量化当前损失、发生频率和基线指标，先证明问题足够昂贵。',
  },
  {
    key: 'data',
    label: '数据条件',
    questions: [
      '能提供真实数据、工作样本或历史记录',
      '清楚数据来源、权限和敏感信息范围',
      '能够为首轮验证准备代表性样本',
    ],
    action: '整理代表性样本、数据来源、权限与敏感范围，建立首轮评估集。',
  },
  {
    key: 'owner',
    label: '组织条件',
    questions: [
      '有业务负责人对结果负责并协调资源',
      '一线使用者能参与诊断和验收',
      '技术与业务双方能共同作出 GO / STOP 决策',
    ],
    action: '明确业务负责人、一线验收者和 GO / STOP 决策机制。',
  },
  {
    key: 'adoption',
    label: '部署采用',
    questions: [
      '愿意从一个可控范围开始',
      '接受人工审核、回退机制和生产护栏',
      '有人负责上线后的 30 / 60 / 90 天复查',
    ],
    action: '确定最小上线范围、人工复核、回退机制和 30/60/90 天负责人。',
  },
] as const;
export const diagnosticQuestions = diagnosticGroups.flatMap((group) =>
  group.questions.map((text) => ({ group: group.key, text })),
);
export function encodeDiagnosticProfile(selected: boolean[]) {
  return selected
    .reduce((mask, value, index) => (value ? mask | (1 << index) : mask), 0)
    .toString(16)
    .padStart(3, '0');
}
export function decodeDiagnosticProfile(profile: string) {
  const mask = /^[0-9a-f]{1,3}$/i.test(profile)
    ? Number.parseInt(profile, 16)
    : 0;
  return diagnosticQuestions.map((_, index) => Boolean(mask & (1 << index)));
}
export function diagnosticDimensionScores(profile: string) {
  const selected = decodeDiagnosticProfile(profile);
  return diagnosticGroups.map((group) => {
    const indexes = diagnosticQuestions
      .map((question, index) => (question.group === group.key ? index : -1))
      .filter((index) => index >= 0);
    return {
      key: group.key,
      label: group.label,
      score: Math.round(
        (indexes.filter((index) => selected[index]).length / indexes.length) *
          100,
      ),
    };
  });
}
export function diagnosticResult(score: number) {
  return score >= 80
    ? {
        decision: 'GO',
        summary:
          '具备进入 FDE 资格确认的主要条件。下一步核验数据范围、问题基线和首个 MVD 边界。',
        mvd: '用 30 分钟资格确认锁定一个业务指标、一个流程节点和一组代表性数据，再设计 2—4 周 MVD。',
      }
    : score >= 50
      ? {
          decision: 'ADJUST',
          summary:
            '方向可能成立，但启动前应补齐最低维度，避免项目在开发后期停滞。',
          mvd: '先用 1—2 周补齐最低维度；完成后重新评分，再决定是否进入现场诊断。',
        }
      : ({
          decision: 'HOLD',
          summary: '暂不建议立即开发。先把问题价值、数据或组织责任说清楚。',
          mvd: '暂停方案和开发讨论，先完成损失量化、数据盘点与负责人确认。',
        } as const);
}
