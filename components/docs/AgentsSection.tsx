import {
  Heading,
  SubHeading,
  Paragraph,
  CodeBlock,
  InlineCode,
  Table,
  BulletList,
  NumberedList,
  Callout,
} from "./DocSection";
import { docs } from "@/lib/i18n-docs";

export function AgentsSection() {
  const a = docs.agents;
  return (
    <>
      <Heading>{a.title}</Heading>
      <Paragraph>
        ClawPort 会自动从你的 OpenClaw 工作空间发现智能体。无需配置 —— 如果你的工作空间中有智能体，ClawPort 会找到并显示它们。
      </Paragraph>

      <SubHeading>自动发现 (默认)</SubHeading>
      <Paragraph>
        ClawPort 扫描 <InlineCode>$WORKSPACE_PATH/agents/</InlineCode> 中包含 <InlineCode>SOUL.md</InlineCode> 文件的子目录。每个目录成为一个智能体，包含：
      </Paragraph>
      <BulletList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>名称</strong> 来自
            SOUL.md 中的第一个 <InlineCode># 标题</InlineCode>，或退而使用目录名
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>职位</strong> 来自
            标题中破折号后的角色描述 (例如 "ECHO -- 社区声音监控器")
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>子智能体</strong>{" "}
            来自 <InlineCode>sub-agents/</InlineCode> 和{" "}
            <InlineCode>members/</InlineCode> 子目录
          </>,
        ]}
      />
      <Paragraph>
        如果 <InlineCode>$WORKSPACE_PATH/SOUL.md</InlineCode> 存在，它将成为根协调器。如果{" "}
        <InlineCode>$WORKSPACE_PATH/IDENTITY.md</InlineCode> 存在，根智能体的名称和 emoji 将从中读取。
      </Paragraph>

      <SubHeading>使用自定义注册表</SubHeading>
      <Paragraph>
        要完全控制名称、颜色、emoji、层级和工具，请在以下位置创建文件：
      </Paragraph>
      <CodeBlock>{`$WORKSPACE_PATH/clawport/agents.json`}</CodeBlock>
      <Paragraph>
        ClawPort 在每次请求时检查此文件。如果存在，它将完全替换自动发现。如果缺失或包含无效 JSON，则使用自动发现。
      </Paragraph>

      <SubHeading>智能体条目格式</SubHeading>
      <CodeBlock title="agents.json">
        {`[
  {
    "id": "my-agent",
    "name": "我的智能体",
    "title": "这个智能体的职责",
    "reportsTo": null,
    "directReports": [],
    "soulPath": "agents/my-agent/SOUL.md",
    "voiceId": null,
    "color": "#06b6d4",
    "emoji": "\\u{1F916}",
    "tools": ["read", "write"],
    "memoryPath": null,
    "description": "关于这个智能体的一句话描述"
  }
]`}
      </CodeBlock>

      <SubHeading>字段参考</SubHeading>
      <Table
        headers={["字段", "类型", "说明"]}
        rows={[
          [
            <InlineCode key="id">id</InlineCode>,
            "string",
            "智能体的唯一标识 (例如 \"vera\")",
          ],
          [
            <InlineCode key="name">name</InlineCode>,
            "string",
            "显示名称 (例如 \"VERA\")",
          ],
          [
            <InlineCode key="title">title</InlineCode>,
            "string",
            "职位头衔 (例如 \"首席战略官\")",
          ],
          [
            <InlineCode key="rt">reportsTo</InlineCode>,
            "string | null",
            "组织图中的父智能体 ID。根节点为 null。",
          ],
          [
            <InlineCode key="dr">directReports</InlineCode>,
            "string[]",
            "子智能体 ID 数组",
          ],
          [
            <InlineCode key="sp">soulPath</InlineCode>,
            "string | null",
            "智能体 SOUL.md 的路径，相对于 WORKSPACE_PATH",
          ],
          [
            <InlineCode key="vi">voiceId</InlineCode>,
            "string | null",
            "ElevenLabs 语音 ID (需要 ELEVENLABS_API_KEY)",
          ],
          [
            <InlineCode key="co">color</InlineCode>,
            "string",
            "组织图中智能体节点的颜色 (十六进制)",
          ],
          [
            <InlineCode key="em">emoji</InlineCode>,
            "string",
            "显示为智能体头像的 emoji",
          ],
          [
            <InlineCode key="to">tools</InlineCode>,
            "string[]",
            "此智能体有权访问的工具列表",
          ],
          [
            <InlineCode key="mp">memoryPath</InlineCode>,
            "string | null",
            "智能体专属记忆的路径 (相对于 WORKSPACE_PATH)",
          ],
          [
            <InlineCode key="de">description</InlineCode>,
            "string",
            "UI 中显示的一句话描述",
          ],
        ]}
      />

      <SubHeading>层级规则</SubHeading>
      <BulletList
        items={[
          <>
            恰好一个智能体应该有 <InlineCode>{"\"reportsTo\": null"}</InlineCode> —— 这是你的根/协调器节点。
          </>,
          <>
            <InlineCode>directReports</InlineCode> 应该与 <InlineCode>reportsTo</InlineCode> 一致。
            如果智能体 B 汇报给智能体 A，那么 A 的 directReports 应该包含 B 的 id。
          </>,
          "组织图使用这些关系自动构建组织架构图。",
        ]}
      />

      <SubHeading>示例：最小双智能体配置</SubHeading>
      <CodeBlock title="agents.json">
        {`[
  {
    "id": "boss",
    "name": "老板",
    "title": "协调器",
    "reportsTo": null,
    "directReports": ["worker"],
    "soulPath": "SOUL.md",
    "voiceId": null,
    "color": "#f5c518",
    "emoji": "\\u{1F451}",
    "tools": ["read", "write", "exec", "message"],
    "memoryPath": null,
    "description": "顶级协调器"
  },
  {
    "id": "worker",
    "name": "工作者",
    "title": "任务执行者",
    "reportsTo": "boss",
    "directReports": [],
    "soulPath": "agents/worker/SOUL.md",
    "voiceId": null,
    "color": "#22c55e",
    "emoji": "\\u{2699}\\u{FE0F}",
    "tools": ["read", "write"],
    "memoryPath": null,
    "description": "处理分配的任务"
  }
]`}
      </CodeBlock>

      <SubHeading>注册表解析顺序</SubHeading>
      <NumberedList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>用户覆盖</strong>{" "}
            -- <InlineCode>$WORKSPACE_PATH/clawport/agents.json</InlineCode> (如果存在且为有效 JSON)。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>自动发现</strong>{" "}
            -- 扫描 <InlineCode>$WORKSPACE_PATH/agents/</InlineCode> 中包含 SOUL.md、sub-agents 和 members 的子目录。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>打包回退</strong>{" "}
            -- <InlineCode>lib/agents.json</InlineCode> (示例团队，用于演示)。
          </>,
        ]}
      />

      <Callout type="tip">
        你可以无需编辑任何源代码就添加新智能体 —— 只需更新你工作空间的 <InlineCode>agents.json</InlineCode>。
        智能体将自动出现在组织图、对话和详情页面中。
      </Callout>

      <SubHeading>智能体显示覆盖</SubHeading>
      <Paragraph>
        每个智能体可以通过设置页面覆盖专属的 emoji 和/或头像图片。这些存储在按智能体 ID 索引的{" "}
        <InlineCode>ClawPortSettings.agentOverrides</InlineCode> 中。<InlineCode>getAgentDisplay()</InlineCode> 函数 
        考虑覆盖因素后解析每个智能体的有效视觉显示。
      </Paragraph>
    </>
  );
}
