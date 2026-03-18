import {
  Heading,
  SubHeading,
  Paragraph,
  CodeBlock,
  InlineCode,
  Table,
  Callout,
  InfoCard,
} from "./DocSection";
import { docs } from "@/lib/i18n-docs";

export function ApiReferenceSection() {
  const api = docs.apiReference;
  return (
    <>
      <Heading>{api.title}</Heading>
      <Paragraph>
        所有 API 路由都是 Next.js App Router 路由处理器，位于 <InlineCode>app/api/</InlineCode>。
        开发期间的基础 URL 是 <InlineCode>http://localhost:3000</InlineCode>。
      </Paragraph>

      <InfoCard title="错误格式">
        <Paragraph>所有错误响应共享一致的 JSON 格式：</Paragraph>
        <CodeBlock>{`{ "error": "人类可读的错误消息" }`}</CodeBlock>
      </InfoCard>

      <SubHeading>路由概览</SubHeading>
      <Table
        headers={["方法", "端点", "网关", "Content-Type"]}
        rows={[
          [
            "GET",
            <InlineCode key="1">/api/agents</InlineCode>,
            "否",
            "application/json",
          ],
          [
            "POST",
            <InlineCode key="2">/api/chat/[id]</InlineCode>,
            "是",
            "text/event-stream",
          ],
          [
            "GET",
            <InlineCode key="3">/api/crons</InlineCode>,
            "否",
            "application/json",
          ],
          [
            "GET",
            <InlineCode key="4">/api/cron-runs</InlineCode>,
            "否",
            "application/json",
          ],
          [
            "GET",
            <InlineCode key="5">/api/memory</InlineCode>,
            "否",
            "application/json",
          ],
          [
            "POST",
            <InlineCode key="6">/api/tts</InlineCode>,
            "是",
            "audio/mpeg",
          ],
          [
            "POST",
            <InlineCode key="7">/api/transcribe</InlineCode>,
            "是",
            "application/json",
          ],
          [
            "POST",
            <InlineCode key="8">/api/kanban/chat/[id]</InlineCode>,
            "是",
            "text/event-stream",
          ],
          [
            "GET",
            <InlineCode key="9">/api/kanban/chat-history/[ticketId]</InlineCode>,
            "否",
            "application/json",
          ],
          [
            "POST",
            <InlineCode key="10">/api/kanban/chat-history/[ticketId]</InlineCode>,
            "否",
            "application/json",
          ],
        ]}
      />

      {/* ── GET /api/agents ────────────────────────────────────── */}
      <SubHeading>GET /api/agents</SubHeading>
      <Paragraph>
        返回已注册智能体的完整列表，每个都包含从文件系统加载的 SOUL.md 内容。不需要参数。
      </Paragraph>
      <Table
        headers={["字段", "类型", "说明"]}
        rows={[
          [<InlineCode key="id">id</InlineCode>, "string", "Slug 标识符"],
          [<InlineCode key="n">name</InlineCode>, "string", "显示名称"],
          [<InlineCode key="t">title</InlineCode>, "string", "职位头衔"],
          [
            <InlineCode key="s">soul</InlineCode>,
            "string | null",
            "完整 SOUL.md 内容，如果文件未找到则为 null",
          ],
          [
            <InlineCode key="c">crons</InlineCode>,
            "CronJob[]",
            "始终为 []（在客户端填充）",
          ],
        ]}
      />

      {/* ── POST /api/chat/[id] ────────────────────────────────── */}
      <SubHeading>POST /api/chat/[id]</SubHeading>
      <Paragraph>
        向智能体发送聊天消息并接收流式响应。根据最新的用户消息是否包含图片，有两个不同的管道。
      </Paragraph>
      <Table
        headers={["字段", "类型", "必填", "说明"]}
        rows={[
          [
            <InlineCode key="m">messages</InlineCode>,
            "ApiMessage[]",
            "是",
            "对话历史",
          ],
          [
            <InlineCode key="o">operatorName</InlineCode>,
            "string",
            "否",
            "显示给智能体的名称。默认为 \"Operator\"",
          ],
        ]}
      />
      <Paragraph>
        <strong style={{ color: "var(--text-primary)" }}>管道 1 (文本):</strong>{" "}
        通过网关流式传输聊天完成。响应是 SSE，包含{" "}
        <InlineCode>{"data: {\"content\":\"token\"}"}</InlineCode> 帧。
      </Paragraph>
      <Paragraph>
        <strong style={{ color: "var(--text-primary)" }}>管道 2 (视觉):</strong>{" "}
        当最新消息包含 image_url 内容时。使用 CLI chat.send + chat.history 轮询。完整响应在单个 SSE 帧中到达。
      </Paragraph>

      {/* ── GET /api/crons ─────────────────────────────────────── */}
      <SubHeading>GET /api/crons</SubHeading>
      <Paragraph>
        返回注册到 OpenClaw 的所有定时任务，包含丰富的调度描述、智能体所有权和交付配置。
        通过 CLI 运行 <InlineCode>openclaw cron list --json</InlineCode>。
      </Paragraph>

      {/* ── GET /api/cron-runs ─────────────────────────────────── */}
      <SubHeading>GET /api/cron-runs</SubHeading>
      <Paragraph>
        返回从文件系统上的 JSONL 日志文件解析的定时任务运行历史。结果按最新排序。
        可选的 <InlineCode>jobId</InlineCode> 查询参数过滤到特定任务。
      </Paragraph>

      {/* ── GET /api/memory ────────────────────────────────────── */}
      <SubHeading>GET /api/memory</SubHeading>
      <Paragraph>
        返回工作空间中关键记忆文件的内容：长期记忆、团队记忆、团队情报以及今天和昨天的每日日志。
        只有存在的文件才会包含在响应中。
      </Paragraph>

      {/* ── POST /api/tts ──────────────────────────────────────── */}
      <SubHeading>POST /api/tts</SubHeading>
      <Paragraph>
        使用 OpenClaw 网关的 TTS 端点将文本转换为语音音频。
      </Paragraph>
      <Table
        headers={["字段", "类型", "必填", "说明"]}
        rows={[
          [
            <InlineCode key="t">text</InlineCode>,
            "string",
            "要合成的文本",
          ],
          [
            <InlineCode key="v">voice</InlineCode>,
            "string",
            "否",
            "语音标识符。默认为 \"alloy\"",
          ],
        ]}
      />

      {/* ── POST /api/transcribe ───────────────────────────────── */}
      <SubHeading>POST /api/transcribe</SubHeading>
      <Paragraph>
        使用 Whisper 端点将音频转录为文本。请求体是 multipart 表单数据，包含 <InlineCode>audio</InlineCode> 文件字段。
      </Paragraph>

      {/* ── SSE Protocol ───────────────────────────────────────── */}
      <SubHeading>SSE 流协议</SubHeading>
      <Paragraph>所有流式聊天端点使用相同的 Server-Sent Events 协议：</Paragraph>
      <CodeBlock>
        {`data: {"content":"你好"}

data: {"content":" 世界"}

data: [DONE]`}
      </CodeBlock>
      <Callout type="note">
        Content-Type 是 <InlineCode>text/event-stream</InlineCode>，带有 <InlineCode>Cache-Control: no-cache</InlineCode>。
        如果流在响应中途发生错误，服务器发送 [DONE] 并关闭连接。
      </Callout>

      <SubHeading>客户端消费</SubHeading>
      <CodeBlock title="示例">
        {`const reader = response.body.getReader()
const decoder = new TextDecoder()
let fullText = ''

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  const chunk = decoder.decode(value, { stream: true })
  const lines = chunk.split('\\n')

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const payload = line.slice(6)
      if (payload === '[DONE]') return fullText
      try {
        const { content } = JSON.parse(payload)
        fullText += content
      } catch { /* 跳过格式错误的帧 */ }
    }
  }
}`}
      </CodeBlock>
    </>
  );
}
