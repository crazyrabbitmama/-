import { ActionType, GameEvent, EndingType, InterviewConfig } from './types';

// Events Database
export const EVENTS: Record<ActionType, GameEvent[]> = {
  [ActionType.WORK]: [
    {
      id: 'w1', title: '熟客夸你',
      text: '熟客：“这孩子干活可勤快！”',
      effects: { skill: 1, mood: 5 }
    },
    {
      id: 'w2', title: '2B 客人',
      text: '“服务生！我点的热茶为什么是热的？！”\n你：？？？\n（同事：忍一下……）',
      effects: { mood: -3 }
    },
    {
      id: 'w3', title: '同事摸鱼',
      text: '你看到同事在刷视频。\n你选择沉默。',
      effects: { mood: 2 }
    },
    {
      id: 'w4', title: '挂面锅糊了',
      text: '你幻想着入职第一天穿什么，\n结果把挂面煮糊了。',
      effects: { mood: -2, money: -5 }
    }
  ],
  [ActionType.STUDY]: [
    {
      id: 's1', title: '学了就忘',
      text: '你学了点新知识，又马上忘掉。\n“该吃点猪脑了。”',
      effects: { skill: 10, mood: -2 }
    },
    {
      id: 's2', title: '八爪鱼事件',
      text: '待办清单：写作品集、面试、刷题、健身、教资……\n然后突然被拉去面试。\n你感觉自己像章鱼，但章鱼至少有海。',
      effects: { skill: 5, mood: -7 }
    }
  ],
  [ActionType.COMM]: [
    {
      id: 'c1', title: 'AI 夸你',
      text: 'AI：“虽然你的学历一般，但你老实。”',
      effects: { comm: 6, mood: 4 }
    },
    {
      id: 'c2', title: 'AI 嘲讽',
      text: 'AI：“你的表达像 PPT：页数挺多。”',
      effects: { comm: 6, mood: -4 }
    }
  ],
  [ActionType.RELAX]: [
    {
      id: 'r1', title: '奶茶上头',
      text: '第一口就喝到了珍珠耶~~',
      effects: { mood: 10 }
    },
    {
      id: 'r2', title: '比烂小组',
      text: '你与朋友互相比烂，\n大家突然都开朗了。',
      effects: { mood: 8 }
    },
    {
      id: 'r3', title: '邋遢遇前任',
      text: '顶着油头穿睡衣买酱油，\n遇到前任穿得人模狗样走过。\n“哟哟哟，这不是内谁吗~”',
      effects: { mood: -8 }
    }
  ],
  [ActionType.FAMILY]: [
    {
      id: 'f1', title: '奶奶的汤饭',
      text: '奶奶端来汤饭：“乖孙孙来吃！”',
      effects: { mood: 10, family: 5, money: 2 }
    },
    {
      id: 'f2', title: '家庭催压',
      text: '亲戚：“来，我们家的大学生说两句！”',
      effects: { mood: -10 }
    },
    {
      id: 'f3', title: '被迫相亲',
      text: '对方说：“我不喜欢孩子，所以你生两个就够了……一男一女凑个‘好’字。”\n你怀疑他语文没学明白。',
      effects: { mood: -10, family: -10 }
    }
  ],
  [ActionType.PORTFOLIO]: [
     // Using Female Job Events as a pool for "Job Seeking" related activities or random portfolio events
     {
       id: 'p1', title: '专注',
       text: '你修改了作品集的排版。看起来专业了一点点。',
       effects: { skill: 2, comm: 2 }
     }
  ]
};

// Special Events
export const SPECIAL_EVENTS = {
  FEMALE_JOB: [
    {
      id: 'fj1', title: '婚育提问',
      text: '“方便说下你的婚育计划吗？”',
      effects: { mood: -3 }
    },
    {
      id: 'fj2', title: '外貌评价',
      text: '“你长得挺老实的。”',
      effects: { mood: -7, comm: 3 }
    },
    {
      id: 'fj3', title: '十箱挂面',
      text: '老板安排你搬十箱挂面，\n亲戚员工在旁边刷视频。\n箱子和生活一样让你喘不上气。',
      effects: { mood: -3, comm: 5 }
    },
    {
      id: 'fj4', title: '轻度骚扰',
      text: '面试官靠近一点：\n“你这么可爱……有没有男朋友？”',
      effects: { mood: -10 }
    }
  ]
};

export const INTERVIEWS: InterviewConfig[] = [
  {
    week: 1, title: '自我介绍', description: '你讲了 3 分钟。\nHR：我们会再联系你。',
    passCondition: (s) => s.comm >= 20, failPenalty: { mood: -3 }
  },
  {
    week: 2, title: '卷王群面', description: '卷王：“我在硅谷带过项目。”',
    passCondition: (s) => s.comm >= 30, failPenalty: { mood: -5 }
  },
  {
    week: 3, title: '婚育拷问', description: 'HR：未来有结婚打算吗？',
    passCondition: (s) => s.comm >= 40, failPenalty: { mood: -7 }
  },
  {
    week: 4, title: '专业问答', description: 'HR问你为',
    passCondition: (s) => s.skill >= 45, failPenalty: { }
  },
  {
    week: 5, title: '大厂初面', description: '“你觉得你比别人优秀在哪里？”',
    passCondition: (s) => s.comm >= 55, failPenalty: { mood: -5 }
  },
  {
    week: 6, title: '终面 BOSS', description: '最后的挑战。',
    passCondition: (s) => s.skill >= 55 && s.comm >= 55, failPenalty: { }
  },
];

export const INITIAL_STATS = {
  skill: 10,
  comm: 10,
  mood: 80,
  family: 50,
  money: 100
};

export const ENDING_DETAILS: Record<EndingType, { title: string, description: string, hint: string }> = {
  [EndingType.GE3]: {
    title: "家里有矿",
    description: "躺平人生：父母摊牌其实家里有钱，大别墅向你招手！",
    hint: "需极高家庭关系"
  },
  [EndingType.GE1]: {
    title: "大厂offer",
    description: "误闯天家进入大厂：再不好过，如今也好过了。",
    hint: "需六边形战士 + 面试全通"
  },
  [EndingType.GE2]: {
    title: "中彩票",
    description: "你刮中七位数。终于你可以在朋友圈发那句我不要很多钱，我要很多爱。",
    hint: "纯随机运气事件"
  },
  [EndingType.GE4]: {
    title: "自洽人生",
    description: "找到了你喜欢的WLB的工作：你终于不被 offer 定义。",
    hint: "需高心态 + 均衡发展"
  },
  [EndingType.BE1]: {
    title: "心态爆炸",
    description: "心态彻底崩了...这破班谁爱上谁上。",
    hint: "心态归零"
  },
  [EndingType.BE2]: {
    title: "被迫相亲",
    description: "被迫相亲，生凑个“好”字...你的一生被安排得明明白白。",
    hint: "家庭关系破裂"
  },
  [EndingType.BE3]: {
    title: "打工还贷",
    description: "能力不足，面试全挂，只能继续打工还贷。",
    hint: "能力低下且面试全败"
  },
  [EndingType.BE4]: {
    title: "被骗个精光",
    description: "你轻信了神秘人的求职陪跑，积蓄被骗个精光。在这个冰冷的城市，你连买挂面的钱都没了。",
    hint: "切勿轻信陌生来电 (Bad End)"
  },
  [EndingType.NE]: {
    title: "挂面大王",
    description: "你继承了家业，成为挂面大王。其实也挺香的。",
    hint: "普通结局"
  }
};