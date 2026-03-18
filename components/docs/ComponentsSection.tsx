import {
  Heading,
  SubHeading,
  Paragraph,
  CodeBlock,
  InlineCode,
  Table,
  BulletList,
  InfoCard,
} from "./DocSection";
import { docs } from "@/lib/i18n-docs";

export function ComponentsSection() {
  const comp = docs.components;
  return (
    <>
      <Heading>{comp.title}</Heading>
      <Paragraph>
        ClawPort 的组件树遵循标准的 Next.js App Router 模式：providers 包裹整个应用，layout 组件处理侧边栏和导航，每个路由渲染自己的页面组件。
      </Paragraph>

      <SubHeading>组件树</SubHeading>
      <CodeBlock>
        {`RootLayout (app/layout.tsx)
  ThemeProvider (app/providers.tsx)
    SettingsProvider (app/settings-provider.tsx)
      DynamicFavicon
      OnboardingWizard
      Sidebar
        NavLinks
        ThemeToggle
        MobileSidebar
        GlobalSearch
      <main> (页面内容)
        HomePage ............. / (组织图、网格、动态)
          OrgMap (React Flow)
            AgentNode
              AgentAvatar
          GridView
          FeedView
        ChatPage .............. /chat
          AgentList
          ConversationView
            VoiceMessage
            FileAttachment
            MediaPreview
        AgentDetailPage ....... /agents/[id]
        KanbanPage ............ /kanban
          KanbanBoard
            KanbanColumn
              TicketCard
          TicketDetailPanel
          CreateTicketModal
            AgentPicker
        CronsPage ............. /crons
          WeeklySchedule
          PipelineGraph
        MemoryPage ............ /memory
        DocsPage .............. /docs
        SettingsPage .......... /settings`}
      </CodeBlock>

      <SubHeading>Providers</SubHeading>
      <InfoCard title="ThemeProvider">
        <BulletList
          items={[
            <>
              <strong style={{ color: "var(--text-primary)" }}>文件:</strong>{" "}
              <InlineCode>app/providers.tsx</InlineCode>
            </>,
            "管理活动主题并通过 <html> 上的 data-theme 属性应用",
            <>
              消费 Hook:{" "}
              <InlineCode>{"const { theme, setTheme } = useTheme()"}</InlineCode>
            </>,
            <>
              持久化到 <InlineCode>localStorage('clawport-theme')</InlineCode>，
              默认为 'dark'
            </>,
          ]}
        />
      </InfoCard>

      <InfoCard title="SettingsProvider">
        <BulletList
          items={[
            <>
              <strong style={{ color: "var(--text-primary)" }}>文件:</strong>{" "}
              <InlineCode>app/settings-provider.tsx</InlineCode>
            </>,
            "所有用户可配置设置的中心状态管理",
            <>
              消费 Hook:{" "}
              <InlineCode>{"const { settings, setAccentColor, ... } = useSettings()"}</InlineCode>
            </>,
            "直接将强调色 CSS 变量应用到 document.documentElement",
            <>
              持久化到{" "}
              <InlineCode>localStorage('clawport-settings')</InlineCode>
            </>,
          ]}
        />
      </InfoCard>

      <SubHeading>布局组件</SubHeading>
      <Table
        headers={["组件", "文件", "用途"]}
        rows={[
          [
            "Sidebar",
            <InlineCode key="s">components/Sidebar.tsx</InlineCode>,
            "桌面端侧边栏包装器。渲染 NavLinks、ThemeToggle、MobileSidebar、GlobalSearch。",
          ],
          [
            "NavLinks",
            <InlineCode key="n">components/NavLinks.tsx</InlineCode>,
            "带图标、徽章和操作员身份底部的侧边栏导航链接。",
          ],
          [
            "MobileSidebar",
            <InlineCode key="m">components/MobileSidebar.tsx</InlineCode>,
            "带汉堡菜单和滑出侧边栏面板的固定移动端顶部栏。",
          ],
          [
            "GlobalSearch",
            <InlineCode key="g">components/GlobalSearch.tsx</InlineCode>,
            "Cmd+K 搜索面板，支持智能模糊搜索智能体、页面和定时任务。",
          ],
          [
            "ThemeToggle",
            <InlineCode key="t">components/ThemeToggle.tsx</InlineCode>,
            "主题选择器，渲染为一行 emoji 按钮，具有 radiogroup 语义。",
          ],
        ]}
      />

      <SubHeading>聊天组件</SubHeading>
      <Table
        headers={["组件", "用途"]}
        rows={[
          [
            "ConversationView",
            "主聊天：消息、SSE 流式传输、文件附件、TTS 播放、语音录制、markdown 渲染。",
          ],
          [
            "AgentList",
            "聊天的智能体选择侧边栏。桌面端（固定 300px）和移动端（全宽）变体。",
          ],
          [
            "VoiceMessage",
            "带播放/暂停切换和动画进度条的音频波形播放。",
          ],
          [
            "FileAttachment",
            "带类型特定图标和下载按钮的文件附件气泡。",
          ],
          [
            "MediaPreview",
            "发送前已暂存附件缩略图的水平条带。",
          ],
        ]}
      />

      <SubHeading>地图组件</SubHeading>
      <Table
        headers={["组件", "用途"]}
        rows={[
          [
            "OrgMap",
            "React Flow 组织图，基于 BFS 的层级布局，边高亮，交互式缩放。",
          ],
          [
            "AgentNode",
            "自定义 React Flow 节点：头像、名称、头衔、定时任务健康指示器、选中状态。",
          ],
          [
            "GridView",
            "带团队分组层级的卡片网格。响应式：1/2/3 列。",
          ],
          [
            "FeedView",
            "专注于定时任务状态的动态流，带统计卡片和筛选标签。",
          ],
        ]}
      />

      <SubHeading>看板组件</SubHeading>
      <Table
        headers={["组件", "用途"]}
        rows={[
          [
            "KanbanBoard",
            "四列看板（待处理、进行中、审核中、已完成），带智能体筛选。",
          ],
          [
            "KanbanColumn",
            "单列，支持 HTML5 拖放，带放置区域高亮。",
          ],
          [
            "TicketCard",
            "可拖放卡片：优先级点、标题、智能体头像、工作状态指示器。",
          ],
          [
            "TicketDetailPanel",
            "滑入侧边面板，显示工单详情和内联智能体聊天。",
          ],
          [
            "CreateTicketModal",
            "创建工单模态框，包含标题、描述、优先级、智能体分配。",
          ],
        ]}
      />

      <SubHeading>其他关键组件</SubHeading>
      <Table
        headers={["组件", "用途"]}
        rows={[
          [
            "OnboardingWizard",
            "5 步首次运行设置向导（名称、主题、强调色、语音、概览）。可从设置重新运行。",
          ],
          [
            "AgentAvatar",
            "智能体头像：个人资料图片、彩色背景上的 emoji，或仅 emoji 模式。",
          ],
          [
            "DynamicFavicon",
            "使用 Canvas API 从门户 emoji/图标生成 favicon。",
          ],
          [
            "ErrorState",
            "带可选重试按钮的全屏错误显示。",
          ],
          [
            "Breadcrumbs",
            "带 Lucide ChevronRight 分隔符的面包屑导航栏。",
          ],
        ]}
      />

      <SubHeading>UI 原语</SubHeading>
      <Paragraph>
        <InlineCode>components/ui/</InlineCode> 中的 Radix 原语组件（shadcn/ui 风格包装器）：
      </Paragraph>
      <BulletList
        items={[
          "Badge, Button, Card, Dialog, ScrollArea, Separator, Skeleton, Tabs, Tooltip",
        ]}
      />
    </>
  );
}
