export const docs = {
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
};
