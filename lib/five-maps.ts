export type FiveMapField = {
  key: string;
  label: string;
  prompt: string;
  placeholder: string;
  critical?: boolean;
};

export type FiveMapDefinition = {
  key: string;
  title: string;
  question: string;
  output: string;
  fields: FiveMapField[];
};

export const fiveMaps: FiveMapDefinition[] = [
  {
    key: "problem",
    title: "问题地图",
    question: "损失在哪里发生？多久发生一次？谁能证明？",
    output: "问题描述、损失公式、当前基线、成功阈值",
    fields: [
      {
        key: "event",
        label: "损失事件",
        prompt: "哪一类具体事件正在损失时间、收入、客户或风险？",
        placeholder:
          "例如：高价值询盘进入邮箱后无人及时识别，首次响应常超过 48 小时",
        critical: true,
      },
      {
        key: "baseline",
        label: "频率与基线",
        prompt: "多久发生一次？当前数量、周期、成本或结果是多少？",
        placeholder:
          "例如：每周约 80 条询盘，30% 超过 24 小时未跟进，历史成交率 6%",
      },
      {
        key: "proof",
        label: "证据与成功阈值",
        prompt: "由什么原始记录证明？改善到什么程度才值得继续？",
        placeholder:
          "例如：邮件时间戳、CRM 跟进与成交记录；目标是漏跟进率低于 5%",
      },
    ],
  },
  {
    key: "process",
    title: "流程地图",
    question: "信息从哪里来，经过谁，在什么节点停滞？",
    output: "当前流程、例外路径、等待点、人工决策点",
    fields: [
      {
        key: "boundary",
        label: "触发与结束",
        prompt: "流程从什么事件开始，到什么业务动作或结果结束？",
        placeholder: "例如：收到询盘开始，以完成首次有效回复并记录下一步结束",
        critical: true,
      },
      {
        key: "steps",
        label: "真实步骤与角色",
        prompt: "实际经过哪些人、系统、表格和判断，而不是制度上怎么写？",
        placeholder:
          "例如：邮箱 → 销售助理分类 → 产品经理查资料 → 销售回复 → CRM 写回",
      },
      {
        key: "friction",
        label: "等待、返工与例外",
        prompt: "最常卡在哪里？哪些例外会改走人工或其他路径？",
        placeholder: "例如：定制参数不全时需三轮确认；特殊报价转经理审批",
      },
    ],
  },
  {
    key: "data",
    title: "数据地图",
    question: "验证需要哪些真实数据？来源、权限和质量如何？",
    output: "数据源、字段、样本量、敏感信息、缺口",
    fields: [
      {
        key: "sources",
        label: "来源与关键字段",
        prompt: "判断和行动分别需要哪些数据源与字段？",
        placeholder: "例如：邮件正文、客户国家、产品、预算、CRM 跟进和成交结果",
        critical: true,
      },
      {
        key: "sample",
        label: "样本与质量",
        prompt: "第一轮能取得多少代表性样本？缺失、冲突和版本问题是什么？",
        placeholder:
          "例如：最近 90 天 500 条询盘；约 15% 缺预算字段，CRM 状态口径不一致",
      },
      {
        key: "permission",
        label: "权限、敏感范围与缺口",
        prompt: "谁批准使用？哪些字段需脱敏、隔离或禁止进入模型？",
        placeholder:
          "例如：销售负责人批准脱敏样本；手机号和合同附件不进入首轮验证",
      },
    ],
  },
  {
    key: "responsibility",
    title: "责任地图",
    question: "谁对结果负责？谁使用？谁批准上线与停止？",
    output: "业务所有者、使用者、审核人、技术责任人、决策门",
    fields: [
      {
        key: "owner",
        label: "业务负责人",
        prompt: "谁对业务结果、资源和跨部门协调负责？",
        placeholder: "例如：海外销售总监，对响应时效和转化结果负责",
        critical: true,
      },
      {
        key: "users",
        label: "使用者与审核人",
        prompt: "谁日常使用？谁审核 AI 输出、处理拒答与例外？",
        placeholder: "例如：6 名销售使用；销售主管审核高价值线索和特殊承诺",
      },
      {
        key: "operators",
        label: "技术运营与决策权",
        prompt: "谁维护系统？谁能作出 GO、ADJUST、HOLD 或 STOP？",
        placeholder:
          "例如：数字化团队维护；业务负责人和信息安全负责人共同决定上线或停止",
      },
    ],
  },
  {
    key: "risk",
    title: "风险地图",
    question: "系统错了会怎样？哪里必须审核、回退或拒答？",
    output: "风险等级、人工边界、回退机制、验收护栏",
    fields: [
      {
        key: "impact",
        label: "失败方式与影响",
        prompt: "哪些错误、越权或遗漏会造成不可接受的业务后果？",
        placeholder: "例如：错误承诺价格或交期会造成亏损、违约和客户信任损失",
        critical: true,
      },
      {
        key: "boundary",
        label: "人机边界",
        prompt: "AI 可以读取、建议、写回或执行到哪一步？哪些动作必须由人批准？",
        placeholder:
          "例如：AI 可分类并起草；价格、交期、发送和客户承诺必须人工确认",
      },
      {
        key: "guardrails",
        label: "拒绝、回退与升级",
        prompt: "证据不足或系统异常时如何拒绝、暂停、回到原流程并升级？",
        placeholder:
          "例如：置信不足转主管；异常时停用自动写回并恢复人工邮箱分配",
      },
    ],
  },
];
