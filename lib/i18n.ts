export const i18n = {
  nav: {
    workspace: "工作空间",
    items: {
      home: "首页",
      kanban: "看板",
      chat: "消息",
      crons: "定时任务",
      activity: "动态",
      costs: "成本",
      memory: "记忆",
      docs: "文档",
      settings: "设置",
    },
  },

  common: {
    loading: "加载中...",
    error: "错误",
    retry: "重试",
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    close: "关闭",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    done: "完成",
    search: "搜索",
    filter: "筛选",
    sort: "排序",
    refresh: "刷新",
    copy: "复制",
    download: "下载",
    upload: "上传",
    yes: "是",
    no: "否",
    all: "全部",
    none: "无",
    unknown: "未知",
    noData: "暂无数据",
    noResults: "无搜索结果",
    learnMore: "了解更多",
    preview: "预览",
    closeNav: "关闭导航菜单",
    openNav: "打开导航菜单",
    commandCentre: "指挥中心",
  },

  home: {
    title: "首页",
    welcome: "欢迎",
    recentActivity: "最近动态",
    quickActions: "快捷操作",
    agentOverview: "智能体概览",
    cronStatus: "定时任务状态",
    noAgents: "暂无智能体",
    addFirstAgent: "添加你的第一个智能体",
  },

  chat: {
    title: "对话",
    placeholder: "输入消息...",
    send: "发送",
    selectAgent: "选择智能体",
    noConversations: "暂无对话",
    startConversation: "开始新对话",
    thinking: "思考中...",
    speaking: "说话中...",
    recording: "录音中...",
    voiceInput: "语音输入",
    play: "播放",
    pause: "暂停",
    sendAttachment: "发送附件",
    stopSpeaking: "停止播放",
    copyText: "复制文字",
    regenerate: "重新生成",
    messageCopied: "消息已复制",
    backToAgents: "返回智能体列表",
    viewAgentProfile: "查看智能体资料",
    clearConversation: "清空对话",
    attachFile: "添加附件",
    copyCode: "复制代码",
    noAgentsMatch: "没有匹配的智能体",
  },

  kanban: {
    title: "看板",
    columns: {
      backlog: "待处理",
      inProgress: "进行中",
      review: "审核中",
      done: "已完成",
    },
    newTicket: "新建工单",
    editTicket: "编辑工单",
    deleteTicket: "删除工单",
    ticketTitle: "标题",
    ticketDescription: "描述",
    ticketPriority: "优先级",
    ticketAssignee: "负责人",
    ticketStatus: "状态",
    ticketCreated: "创建时间",
    ticketUpdated: "更新时间",
    priorities: {
      low: "低",
      medium: "中",
      high: "高",
      urgent: "紧急",
    },
    noTickets: "暂无工单",
    createFirst: "创建你的第一个工单",
    dragHint: "拖拽卡片以移动",
    expandPanel: "展开面板",
    collapsePanel: "折叠面板",
    streamFailed: "流式响应失败",
    apiError: "获取响应出错，请检查 API 连接",
  },

  crons: {
    title: "定时任务",
    overview: "概览",
    schedule: "计划",
    pipelines: "管道",
    status: {
      ok: "正常",
      error: "错误",
      idle: "空闲",
      running: "运行中",
    },
    lastRun: "上次运行",
    nextRun: "下次运行",
    lastDuration: "运行时长",
    consecutiveErrors: "连续错误",
    enable: "启用",
    disable: "禁用",
    runNow: "立即运行",
    viewLogs: "查看日志",
    noCrons: "暂无定时任务",
    addCron: "添加定时任务",
  },

  activity: {
    title: "动态",
    logs: "日志",
    stream: "实时流",
    filterByLevel: "按级别筛选",
    all: "全部",
    errors: "错误",
    cron: "定时任务",
    config: "配置",
    noLogEntries: "暂无日志条目",
    noEntriesMatch: "没有符合筛选条件的条目",
    logEntriesHint: "定时任务运行和配置更改的日志将显示在这里",
    levels: {
      info: "信息",
      warning: "警告",
      error: "错误",
      debug: "调试",
    },
    noLogs: "暂无日志",
    clearLogs: "清除日志",
    downloadLogs: "下载日志",
  },

  costs: {
    title: "成本",
    summary: "摘要",
    today: "今日",
    thisWeek: "本周",
    thisMonth: "本月",
    totalCost: "总成本",
    tokens: "令牌数",
    requests: "请求数",
    avgCost: "平均成本",
    topCrons: "消耗最高定时任务",
    optimization: "优化建议",
    noCosts: "暂无成本数据",
    streamConnectionFailed: "流连接失败",
    stopStream: "停止流",
    startStream: "开始流",
    copyFilteredLogs: "复制筛选日志",
    copyAllLogs: "复制全部日志",
    showLogs: "显示日志",
    hideLogs: "隐藏日志",
    waitingForLogData: "等待日志数据...",
    clickPlayToStart: "点击播放开始流式传输",
  },

  memory: {
    title: "记忆",
    longTerm: "长期记忆",
    team: "团队记忆",
    intel: "团队情报",
    daily: "每日记录",
    today: "今天",
    yesterday: "昨天",
    noMemory: "暂无记忆内容",
    addMemory: "添加记忆",
    editMemory: "编辑记忆",
  },

  agents: {
    title: "智能体",
    name: "名称",
    role: "角色",
    status: "状态",
    crons: "定时任务",
    lastActive: "最后活跃",
    viewDetails: "查看详情",
    edit: "编辑",
    delete: "删除",
    confirmDelete: "确定要删除此智能体吗？",
    noAgents: "暂无智能体",
    offline: "离线",
    online: "在线",
    busy: "忙碌",
  },

  settings: {
    title: "设置",
    general: "通用",
    appearance: "外观",
    notifications: "通知",
    account: "账户",
    operatorName: "操作员名称",
    portalName: "门户名称",
    portalSubtitle: "门户副标题",
    portalEmoji: "门户图标",
    theme: "主题",
    accentColor: "强调色",
    language: "语言",
    timezone: "时区",
    save: "保存设置",
    saved: "已保存",
    reset: "重置",
    resetAll: "重置所有设置",
    deleteData: "删除所有数据",
    confirmReset: "确定要重置所有设置为默认值吗？",
    confirmDelete: "确定要删除所有服务器端对话数据吗？",
    cleared: "已清除",
    failedClear: "清除服务器数据失败",
    rescanAgents: "重新扫描智能体",
    customIcon: "自定义图标",
    removeIcon: "移除图标",
    preview: "预览",
    uploadImage: "上传图片",
    agentOverrides: "智能体覆盖",
    overrideAvatar: "覆盖头像",
    emojiOnly: "仅显示 emoji",
    iconBgHidden: "隐藏图标背景",
    colors: {
      red: "红色",
      gold: "金色",
      blue: "蓝色",
      green: "绿色",
      orange: "橙色",
      purple: "紫色",
      pink: "粉色",
      teal: "青色",
      cyan: "天蓝色",
      indigo: "靛蓝色",
      rose: "玫瑰红",
      lime: "青柠色",
    },
  },

  onboarding: {
    welcome: "欢迎使用 ClawPort",
    step: "第 {n} 步，共 {total} 步",
    steps: {
      name: "欢迎",
      nameDesc: "告诉我们你的名字",
      theme: "选择主题",
      themeDesc: "选择你喜欢的界面风格",
      accent: "选择强调色",
      accentDesc: "选择你的品牌颜色",
      voice: "语音设置",
      voiceDesc: "配置语音选项",
      overview: "准备就绪",
      overviewDesc: "开始使用 ClawPort",
    },
    enterName: "输入你的名字",
    continue: "继续",
    getStarted: "开始使用",
    skip: "跳过",
  },

  errors: {
    generic: "发生错误",
    network: "网络错误，请检查连接",
    notFound: "未找到",
    unauthorized: "未授权",
    forbidden: "禁止访问",
    serverError: "服务器错误",
    retry: "重试",
  },

  tooltips: {
    minimize: "最小化",
    maximize: "最大化",
    close: "关闭",
    settings: "设置",
    logout: "退出登录",
    help: "帮助",
    search: "搜索",
  },

  docs: {
    pageTitle: "文档",
    searchPlaceholder: "搜索章节...",
    noSectionsMatch: "没有匹配的章节",
    backToSections: "返回章节列表",

    sections: {
      "getting-started": {
        label: "快速开始",
        description: "安装配置、环境变量、前置条件",
      },
      architecture: {
        label: "架构设计",
        description: "系统概览、数据流程、管道",
      },
      agents: {
        label: "智能体",
        description: "注册表、层级结构、定制化",
      },
      "best-practices": {
        label: "最佳实践",
        description: "层级结构、记忆、工具、命名规范",
      },
      "api-reference": {
        label: "API 参考",
        description: "所有接口、请求响应格式",
      },
      "cron-system": {
        label: "定时任务系统",
        description: "调度配置、监控、消息推送",
      },
      theming: {
        label: "主题定制",
        description: "主题样式、CSS 属性、个性化",
      },
      components: {
        label: "组件",
        description: "组件树、属性、模式",
      },
      troubleshooting: {
        label: "问题排查",
        description: "常见问题与解决方案",
      },
    },

    gettingStarted: {
      title: "快速开始",
      intro: "本指南将帮助你启动 ClawPort 并连接到你的 OpenClaw 实例。ClawPort 是一个 Next.js 16 管理面板，用于管理、监控和直接与你自己的 OpenClaw AI 智能体对话。",

      prerequisites: "前置条件",
      prerequisiteList: [
        { title: "Node.js 22+", desc: "运行 node -v 验证" },
        { title: "OpenClaw", desc: "已安装并正常运行: openclaw --version" },
        { title: "OpenClaw 网关运行中", desc: "ClawPort 默认连接 localhost:18789 (可通过 OPENCLAW_GATEWAY_PORT 配置)" },
      ],

      quickStartNpm: "快速开始 (npm)",
      npmNote: "npm 包名是 clawport-ui，命令行是 clawport。请注意不要安装另一个无关的 clawport 包。",
      quickStartSource: "快速开始 (源码)",
      firstLaunch: "打开 http://localhost:3000，首次启动会显示引导向导，帮你配置门户名称、选择主题和个性化智能体头像。",

      environmentVariables: "环境变量",
      envAutoSetup: "最快捷的配置方式是运行自动设置脚本：npm run setup。它会自动检测你的 WORKSPACE_PATH、OPENCLAW_BIN 和网关令牌。",
      envManualSetup: "手动配置请复制模板文件并编辑：",

      whatNext: "下一步",
      whatNextList: [
        "查看架构设计章节了解系统工作原理",
        "配置定时任务实现自动化",
        "探索主题定制选项个性化界面",
      ],
    },

    architecture: {
      title: "架构设计",
      intro: "ClawPort 采用现代化架构设计，构建于 Next.js 16 App Router 之上，与 OpenClaw 网关通过 HTTP/SSE 进行通信。",

      overview: "系统概览",
      overviewDesc: "ClawPort 由以下几个核心模块组成：",

      components: "核心组件",
      componentsList: [
        { name: "前端 (Next.js 16)", desc: "React 服务端组件 + 客户端交互，提供响应式 UI" },
        { name: "状态管理", desc: "使用 React Context 和 useReducer 管理应用状态" },
        { name: "SSE 流式通信", desc: "通过 Server-Sent Events 接收实时日志和智能体响应" },
        { name: "API 路由", desc: "Next.js API 路由作为前端与 OpenClaw 网关的代理层" },
      ],

      dataFlow: "数据流",
      dataFlowDesc: "用户操作 → Next.js API 路由 → OpenClaw 网关 → OpenClaw 核心 → 返回响应 → SSE 流式推送 → UI 更新",

      pipelines: "管道 (Pipelines)",
      pipelinesDesc: "管道是 ClawPort 的核心抽象，代表一个完整的 AI 工作流。每个管道包含：",

      memory: "记忆系统",
      memoryDesc: "ClawPort 维护智能体的长期记忆，包括：",

      nextSteps: "下一步",
    },

    agents: {
      title: "智能体",
      intro: "智能体是 ClawPort 的核心执行单元，每个智能体有特定的职责和能力。",

      registry: "智能体注册表",
      registryDesc: "智能体定义存储在 lib/agents.json 中，包含了所有可用智能体的配置。每个智能体有以下属性：",

      hierarchy: "层级结构",
      hierarchyDesc: "智能体采用层级结构，父智能体可以调用子智能体：",

      customization: "定制化",
      customizationDesc: "可以通过以下方式定制智能体：",

      nextSteps: "下一步",
    },

    bestPractices: {
      title: "最佳实践",
      intro: "以下是使用 ClawPort 和构建智能体工作流的最佳实践。",

      hierarchy: "层级结构设计",
      hierarchyDesc: "保持智能体层级扁平且专注，每个智能体应有明确的单一职责。",

      memory: "记忆管理",
      memoryDesc: "合理利用记忆系统存储关键信息，避免记忆过载。",

      tools: "工具使用",
      toolsDesc: "为智能体配备必要的工具，但避免过度设计。",

      naming: "命名规范",
      namingDesc: "使用清晰描述性的名称，便于理解和维护。",

      nextSteps: "下一步",
    },

    apiReference: {
      title: "API 参考",
      intro: "ClawPort 提供以下 API 端点：",

      endpoints: "端点列表",

      nextSteps: "下一步",
    },

    cronSystem: {
      title: "定时任务系统",
      intro: "ClawPort 的定时任务系统允许你自动化智能体工作流。",

      schedules: "调度配置",
      schedulesDesc: "支持 cron 表达式配置定时任务：",

      monitoring: "监控",
      monitoringDesc: "通过仪表板监控任务执行状态和历史。",

      delivery: "消息推送",
      deliveryDesc: "任务完成后可通过多种渠道推送通知。",

      nextSteps: "下一步",
    },

    theming: {
      title: "主题定制",
      intro: "ClawPort 支持丰富的主题定制选项。",

      themes: "主题",
      themesDesc: "内置多种主题，可通过设置页面切换。",

      cssProperties: "CSS 属性",
      cssPropertiesDesc: "使用 CSS 变量控制样式：",

      customization: "定制化",
      customizationDesc: "可以通过覆盖 CSS 变量实现深度定制。",

      nextSteps: "下一步",
    },

    components: {
      title: "组件",
      intro: "ClawPort 的组件库构建于现代 React 模式之上。",

      componentTree: "组件树",
      componentTreeDesc: "主要组件结构：",

      props: "属性",
      propsDesc: "组件使用 TypeScript 提供完整的类型支持。",

      patterns: "模式",
      patternsDesc: "使用复合组件和 Render Props 模式实现灵活性。",

      nextSteps: "下一步",
    },

    troubleshooting: {
      title: "问题排查",
      intro: "常见问题与解决方案。",

      commonIssues: "常见问题",

      installation: "安装问题",
      installationIssues: [
        { problem: "EACCES: permission denied", solution: "运行 sudo chown -R $(whoami) ~/.npm 修复权限" },
        { problem: "EEXIST 错误", solution: "清理 npm 缓存后重试" },
      ],

      connection: "连接问题",
      connectionIssues: [
        { problem: "无法连接到网关", solution: "检查 OpenClaw 网关是否运行在正确端口" },
        { problem: "认证失败", solution: "验证 OPENCLAW_TOKEN 环境变量配置正确" },
      ],

      runtime: "运行时问题",
      runtimeIssues: [
        { problem: "界面显示异常", solution: "清除浏览器缓存或尝试无痕模式" },
        { problem: "实时更新不工作", solution: "检查 SSE 连接状态" },
      ],

      nextSteps: "下一步",
    },
  },
};

export type I18n = typeof i18n;
