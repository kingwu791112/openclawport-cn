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

export function GettingStartedSection() {
  const gs = docs.gettingStarted;
  return (
    <>
      <Heading>{gs.title}</Heading>
      <Paragraph>{gs.intro}</Paragraph>

      <SubHeading>{gs.prerequisites}</SubHeading>
      <BulletList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>Node.js 22+</strong>{" "}
            -- 运行 <InlineCode>node -v</InlineCode> 验证
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>OpenClaw</strong>{" "}
            -- 已安装并正常运行: <InlineCode>openclaw --version</InlineCode>
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              OpenClaw 网关运行中
            </strong>{" "}
            -- ClawPort 默认连接{" "}
            <InlineCode>localhost:18789</InlineCode> (可通过{" "}
            <InlineCode>OPENCLAW_GATEWAY_PORT</InlineCode> 配置)
          </>,
        ]}
      />

      <SubHeading>{gs.quickStartNpm}</SubHeading>
      <Callout type="note">
        npm 包名是 <InlineCode>clawport-ui</InlineCode>，命令行是{" "}
        <InlineCode>clawport</InlineCode>。请注意不要安装另一个无关的{" "}
        <InlineCode>clawport</InlineCode> 包。
      </Callout>
      <CodeBlock title="终端">
        {`# 全局安装 (包名: clawport-ui, 命令: clawport)
npm install -g clawport-ui

# 运行设置向导 (自动检测你的 OpenClaw 配置)
clawport setup

# 启动开发服务器
clawport dev`}
      </CodeBlock>
      <Callout type="warning">
        如果安装时遇到 <InlineCode>EACCES: permission denied</InlineCode> 或{" "}
        <InlineCode>EEXIST</InlineCode> 错误，说明你的 npm 缓存权限有问题 (通常是因为之前使用了{" "}
        <InlineCode>sudo npm install</InlineCode>)。运行:{" "}
        <InlineCode>sudo chown -R $(whoami) ~/.npm</InlineCode> 然后重试。
        详见问题排查章节。
      </Callout>

      <SubHeading>{gs.quickStartSource}</SubHeading>
      <CodeBlock title="终端">
        {`# 克隆仓库
git clone https://github.com/JohnRiceML/clawport-ui.git
cd clawport-ui

# 安装依赖
npm install

# 自动检测 OpenClaw 配置并写入 .env.local
npm run setup

# 启动开发服务器
npm run dev`}
      </CodeBlock>
      <Paragraph>
        打开 <InlineCode>http://localhost:3000</InlineCode>，首次启动会显示引导向导，
        帮你配置门户名称、选择主题和个性化智能体头像。
      </Paragraph>

      <SubHeading>{gs.environmentVariables}</SubHeading>
      <Paragraph>
        最快捷的配置方式是运行自动设置脚本：<InlineCode>npm run setup</InlineCode>。
        它会自动检测你的 <InlineCode>WORKSPACE_PATH</InlineCode>、{" "}
        <InlineCode>OPENCLAW_BIN</InlineCode> 和网关令牌。
      </Paragraph>
      <Paragraph>手动配置请复制模板文件并编辑：</Paragraph>
      <CodeBlock>{`cp .env.example .env.local`}</CodeBlock>

      <Table
        headers={["变量", "必填", "说明"]}
        rows={[
          [
            <InlineCode key="ws">WORKSPACE_PATH</InlineCode>,
            "是",
            "OpenClaw 工作空间目录路径 (默认: ~/.openclaw/workspace)",
          ],
          [
            <InlineCode key="bin">OPENCLAW_BIN</InlineCode>,
            "是",
            "openclaw CLI 二进制的绝对路径",
          ],
          [
            <InlineCode key="tok">OPENCLAW_GATEWAY_TOKEN</InlineCode>,
            "是",
            "用于网关所有 API 调用的认证令牌",
          ],
          [
            <InlineCode key="el">ELEVENLABS_API_KEY</InlineCode>,
            "否",
            "ElevenLabs API 密钥，用于智能体配置的语音/TTS 指示器",
          ],
        ]}
      />

      <Callout type="tip">
        无需单独的 AI API 密钥。所有 AI 调用 (对话、视觉、TTS、转录) 都通过 OpenClaw 网关。
        一个订阅，一个令牌。
      </Callout>

      <SubHeading>查找配置值</SubHeading>
      <NumberedList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>WORKSPACE_PATH</strong>:{" "}
            运行 <InlineCode>ls ~/.openclaw/workspace</InlineCode> 验证。
            你应该能看到 <InlineCode>SOUL.md</InlineCode>、{" "}
            <InlineCode>agents/</InlineCode> 目录和{" "}
            <InlineCode>memory/</InlineCode> 目录。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>OPENCLAW_BIN</strong>:{" "}
            运行 <InlineCode>which openclaw</InlineCode> 并使用完整路径。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              OPENCLAW_GATEWAY_TOKEN
            </strong>
            : 运行 <InlineCode>openclaw gateway status</InlineCode> 查看网关配置，包括令牌。
          </>,
        ]}
      />

      <SubHeading>启动网关</SubHeading>
      <Paragraph>
        ClawPort 期望 OpenClaw 网关运行在 <InlineCode>localhost:18789</InlineCode> (或自定义端口)。
        在单独终端中启动：
      </Paragraph>
      <CodeBlock>{`openclaw gateway run`}</CodeBlock>
      <Callout type="warning">
        网关的 HTTP chat completions 端点默认是禁用的。
        运行 <InlineCode>clawport setup</InlineCode> 会检测到这一点并自动启用。
        如果对话返回 405 错误，见问题排查章节。
      </Callout>

      <SubHeading>首次运行引导</SubHeading>
      <Paragraph>
        首次访问时，ClawPort 会启动引导向导 (5 个步骤)：
      </Paragraph>
      <NumberedList
        items={[
          "为你的门户命名 — 为你的指挥中心设置自定义名称和副标题",
          "选择主题 — 从深色、玻璃、彩色、浅色或跟随系统 中选择",
          "设置强调色 — 个性化 UI 高亮颜色",
          "语音对话 — 可选的麦克风权限测试",
          "概览 — 所有页面功能摘要",
        ]}
      />
      <Paragraph>这些都可以稍后在设置页面中修改。</Paragraph>

      <SubHeading>生产环境构建</SubHeading>
      <CodeBlock title="终端">
        {`npx next build
npm start`}
      </CodeBlock>
      <Paragraph>
        生产服务器默认运行在端口 3000。网关仍需保持运行。
      </Paragraph>
    </>
  );
}
