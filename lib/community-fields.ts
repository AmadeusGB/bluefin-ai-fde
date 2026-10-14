export type Section = 'club' | 'fde' | 'enterprise';
export const sections = {
  club: {
    name: 'AI俱乐部',
    en: 'AI EXPLORERS',
    line: '让好奇心，成为创造力。',
    intro: '与AI爱好者一起学习、交流和动手实践，把一个想法变成可以使用的作品。',
    features: [
      '线下交流与主题分享',
      '实战课程与学习资料',
      '跨行业伙伴与作品交流',
    ],
  },
  fde: {
    name: 'FDE联盟',
    en: 'BUILD IN THE FIELD',
    line: '走进现场，让技术落地。',
    intro:
      '连接正在学习FDE的伙伴与有交付经验的工程师，围绕真实业务场景开展学习、协作与项目实践。',
    features: [
      'FDE学习与实践路径',
      '案例交流与能力展示',
      '项目协作与派单意向登记',
    ],
  },
  enterprise: {
    name: 'AI企业家联盟',
    en: 'BUSINESS, REIMAGINED',
    line: '让AI，进入真实生意。',
    intro:
      '面向已经开展或希望开展AI改造的企业负责人，分享实践经验，发现适合自己企业的第一步。',
    features: [
      '企业AI改造经验交流',
      '填写问卷获取免费初步诊断',
      '企业案例与落地方法资料',
    ],
  },
} as const;
export type Field = {
  key: string;
  label: string;
  options?: string[];
  multi?: boolean;
  optional?: boolean;
  type?: string;
  help?: string;
};
const f = (
  key: string,
  label: string,
  options?: string[],
  rest: Partial<Field> = {},
): Field => ({ key, label, options, ...rest });
export const commonFields: Field[] = [
  f('name', '姓名'),
  f('displayName', '会员展示昵称'),
  f('phone', '联系电话', undefined, {
    type: 'tel',
    help: '仅管理员可见。当前使用手机号与密码登录，不代表已完成短信认证。',
  }),
  f('gender', '性别', ['男', '女', '不愿透露']),
  f('city', '常驻城市'),
  f('industry', '所属行业', [
    '制造业',
    '跨境电商',
    '零售与消费品',
    '珠宝',
    '教育培训',
    '软件与信息服务',
    '企业服务',
    '餐饮与文旅',
    '物流',
    '医疗健康',
    '其他',
  ]),
  f('role', '目前身份', [
    '企业负责人',
    '管理者',
    '技术人员',
    '运营与市场',
    '设计与内容创作',
    '自由职业',
    '学生',
    '其他',
  ]),
  f('company', '公司 / 团队名称', undefined, { optional: true }),
  f('aiLevel', '使用AI的程度', [
    '尚未开始',
    '偶尔尝试',
    '日常使用',
    '熟练搭建工作流',
    '能够开发与集成',
  ]),
  f(
    'tools',
    '常用AI工具',
    [
      '豆包',
      'DeepSeek',
      '元宝',
      'ChatGPT',
      'Claude',
      'Codex',
      'Coze / 扣子',
      'Dify',
      '其他',
      '暂无',
    ],
    { multi: true },
  ),
  f('offline', '是否愿意经常参加线下活动', [
    '愿意经常参加',
    '按主题选择',
    '偶尔参加',
    '暂时只参加线上',
  ]),
  f('activityRange', '可参与活动的范围', ['本市', '省内', '全国', '仅线上']),
  f('time', '方便参与的时间', ['工作日白天', '工作日晚上', '周末'], {
    multi: true,
  }),
  f('source', '从哪里了解到蓝旗鱼', [
    '朋友推荐',
    '线下活动',
    '公众号 / 视频号',
    '搜索 / AI推荐',
    '其他',
  ]),
];
export const roleFields: Record<Section, Field[]> = {
  club: [
    f(
      'goals',
      '希望获得什么',
      ['AI入门', '工作提效', '内容创作', '开发产品', '结识伙伴', '探索创业'],
      { multi: true },
    ),
    f(
      'interests',
      '感兴趣的方向',
      [
        '智能体',
        '办公自动化',
        '编程与应用',
        '图片与视频',
        '知识管理',
        '企业应用',
      ],
      { multi: true },
    ),
    f('weeklyTime', '每周可投入时间', [
      '不足2小时',
      '2—5小时',
      '5—10小时',
      '10小时以上',
    ]),
    f(
      'learningFormat',
      '偏好的学习方式',
      ['线下实战', '线上直播', '录播自学', '项目共创'],
      { multi: true },
    ),
    f('share', '是否愿意分享自己的实践', [
      '愿意分享',
      '有成果后愿意',
      '先学习',
    ]),
    f('challenge', '目前最希望解决的问题', undefined, {
      optional: true,
      type: 'textarea',
    }),
  ],
  fde: [
    f('stage', 'FDE实践阶段', [
      '正在了解',
      '学习中，有练习作品',
      '有内部项目经验',
      '有付费交付经验',
    ]),
    f(
      'skills',
      '擅长或正在学习的方向',
      [
        '业务需求分析',
        '知识库 / RAG',
        '智能体开发',
        '工作流自动化',
        '前后端开发',
        '数据处理',
        '部署与运维',
        '项目交付',
      ],
      { multi: true },
    ),
    f('caseCount', '过往项目数量', ['暂无', '1—2个', '3—5个', '6个以上']),
    f('caseTitle', '代表案例 / 练习作品名称', undefined, { optional: true }),
    f('caseDescription', '案例中的问题、你的角色和完成情况', undefined, {
      optional: true,
      type: 'textarea',
    }),
    f('dispatch', '是否愿意接受联盟派单', [
      '愿意',
      '经过评估后愿意',
      '暂不接受',
    ]),
    f('travel', '是否愿意出差', [
      '不出差',
      '本市现场',
      '省内短期',
      '全国短期',
      '可长期驻场',
    ]),
    f('availability', '每周可用于项目的时间', [
      '不足10小时',
      '10—20小时',
      '20—40小时',
      '全职投入',
    ]),
    f('start', '可开始协作的时间', ['立即', '两周内', '一个月内', '待沟通']),
    f(
      'delivery',
      '可承担的交付环节',
      [
        '需求访谈',
        '原型开发',
        '系统集成',
        '部署上线',
        '培训与交接',
        '后续运维',
      ],
      { multi: true },
    ),
    f(
      'deployment',
      '熟悉的部署方式',
      ['尚未部署', '云服务', '本地部署', '企业内网'],
      { multi: true },
    ),
    f('contract', '合作与开票条件', ['个人合作', '可由公司签约开票', '待沟通']),
    f('caseVisibility', '案例可见范围', ['仅管理员', '可向会员展示摘要']),
  ],
  enterprise: [
    f('companySize', '企业规模', [
      '1—9人',
      '10—49人',
      '50—199人',
      '200—499人',
      '500人以上',
    ]),
    f('revenue', '年营业额（人民币）', [
      '100万元以下',
      '100万—500万元',
      '500万—2000万元',
      '2000万—1亿元',
      '1亿元以上',
      '不便透露',
    ]),
    f('aiAdoption', '公司AI应用阶段', [
      '尚未开始',
      '员工个人尝试',
      '单部门试点',
      '多个部门使用',
      '已进入核心流程',
    ]),
    f('penetration', '每周使用AI的员工比例', [
      '不足10%',
      '10%—30%',
      '30%—60%',
      '60%以上',
      '暂不清楚',
    ]),
    f(
      'departments',
      '优先改造的部门',
      [
        '销售',
        '客服',
        '运营与市场',
        '财务',
        '人事行政',
        '生产与供应链',
        '研发',
        '管理层',
      ],
      { multi: true },
    ),
    f(
      'pains',
      '优先解决的问题（最多3项）',
      [
        '重复录入与报表',
        '知识查找与传承',
        '客户跟进',
        '内容生产',
        '经营分析',
        '流程审批',
        '质量与交付',
      ],
      { multi: true },
    ),
    f('data', '业务资料目前的状态', [
      '资料分散，尚未整理',
      '已有电子文档',
      '已有结构化系统数据',
      '有明确的数据权限与质量规范',
    ]),
    f(
      'systems',
      '当前主要使用的系统',
      [
        'Excel / 表格',
        'ERP',
        'CRM',
        '飞书 / 钉钉 / 企业微信',
        '知识库',
        '自研系统',
        '暂无',
      ],
      { multi: true },
    ),
    f('owner', '项目负责人安排', [
      '尚未确定',
      '老板牵头',
      '有业务负责人',
      '业务与技术共同负责',
    ]),
    f('budget', '首期投入预算', [
      '尚未确定',
      '1万元以内',
      '1万—5万元',
      '5万—20万元',
      '20万元以上',
    ]),
    f('timeline', '希望多久看到首个改造成果', [
      '1个月内',
      '1—3个月',
      '3—6个月',
      '6个月以上',
    ]),
    f('overallTimeline', '整体AI改造的预期周期', [
      '3个月内',
      '3—6个月',
      '6—12个月',
      '持续推进',
    ]),
    f(
      'success',
      '希望优先改善的指标',
      [
        '节省时间',
        '降低差错',
        '增加响应速度',
        '提高交付质量',
        '改善客户转化',
        '尚未确定',
      ],
      { multi: true },
    ),
    f('security', '部署要求', [
      '可使用云服务',
      '敏感数据需脱敏',
      '必须企业内网部署',
      '需要进一步评估',
    ]),
    f('sharing', '是否愿意参与企业经验交流', [
      '愿意分享和交流',
      '可匿名分享',
      '仅学习，不分享',
    ]),
    f('businessProblem', '补充一个具体业务问题', undefined, {
      optional: true,
      type: 'textarea',
    }),
  ],
};
export function isSection(value: unknown): value is Section {
  return typeof value === 'string' && Object.hasOwn(sections, value);
}
export function validateAnswers(
  section: Section,
  input: Record<string, unknown>,
) {
  const result: Record<string, string | string[]> = {};
  for (const field of [...commonFields, ...roleFields[section]]) {
    const v = input[field.key];
    if (field.multi) {
      if (!Array.isArray(v) || !v.length) {
        if (field.optional) continue;
        throw new Error(`请选择：${field.label}`);
      }
      if (
        v.some((x) => typeof x !== 'string' || !field.options?.includes(x)) ||
        v.length > field.options!.length
      )
        throw new Error(`${field.label}选项无效`);
      if (field.key === 'pains' && v.length > 3)
        throw new Error('优先问题最多选择3项');
      result[field.key] = [...new Set(v)];
    } else {
      const s = typeof v === 'string' ? v.trim() : '';
      if (!s && !field.optional) throw new Error(`请填写：${field.label}`);
      if (s.length > (field.type === 'textarea' ? 2000 : 120))
        throw new Error(`${field.label}内容过长`);
      if (s && field.options && !field.options.includes(s))
        throw new Error(`${field.label}选项无效`);
      result[field.key] = s;
    }
  }
  if (!/^\+?[0-9][0-9 -]{6,19}$/.test(String(result.phone)))
    throw new Error('请填写有效的联系电话');
  return result;
}
