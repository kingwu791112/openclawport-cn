import {
  Heading,
  SubHeading,
  Paragraph,
  CodeBlock,
  InlineCode,
  BulletList,
  NumberedList,
  Callout,
} from "./DocSection";
import { docs } from "@/lib/i18n-docs";

export function TroubleshootingSection() {
  const ts = docs.troubleshooting;
  return (
    <>
      <Heading>{ts.title}</Heading>
      <Paragraph>{ts.intro}</Paragraph>

      {/* ── npm install permission errors ──────────────────────── */}
      <SubHeading>
        npm install -g 时出现 EACCES / EEXIST / permission denied
      </SubHeading>
      <Paragraph>
        如果看到 <InlineCode>EACCES: permission denied</InlineCode>、{" "}
        <InlineCode>EEXIST</InlineCode>、{" "}
        <InlineCode>Invalid response body while trying to fetch</InlineCode>，或者
        在运行 <InlineCode>npm install -g clawport-ui</InlineCode> 时{" "}
        <InlineCode>~/.npm/_cacache</InlineCode> 中出现重命名失败，
        说明你的 npm 缓存已损坏或权限有问题。这通常是因为之前使用{" "}
        <InlineCode>sudo</InlineCode> 运行了 <InlineCode>npm install -g</InlineCode>。
      </Paragraph>
      <Paragraph>
        <strong style={{ color: "var(--text-primary)" }}>快速修复</strong> --
        清理缓存后重试：
      </Paragraph>
      <CodeBlock title="终端">
        {`sudo npm cache clean --force
npm install -g clawport-ui`}
      </CodeBlock>
      <Paragraph>如果仍然失败，修复底层权限：</Paragraph>
      <CodeBlock title="终端">
        {`# 修复 npm 缓存所有权
sudo chown -R $(whoami) ~/.npm

# 修复全局 node_modules 所有权 (先找到你的 prefix)
npm prefix -g
# 然后修复该路径的权限，例如：
sudo chown -R $(whoami) /usr/local/lib/node_modules
sudo chown -R $(whoami) /usr/local/bin

# 不使用 sudo 重试
npm install -g clawport-ui`}
      </CodeBlock>
      <Paragraph>
        <strong style={{ color: "var(--text-primary)" }}>
          替代方案：完全避免使用 sudo
        </strong>{" "}
        -- 配置 npm 将全局包安装到你的主目录：
      </Paragraph>
      <CodeBlock title="终端">
        {`mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
npm install -g clawport-ui`}
      </CodeBlock>
      <Callout type="warning">
        永远不要使用 <InlineCode>sudo npm install -g</InlineCode> —— 它会在你用户的
        npm 缓存和全局目录中创建 root 拥有的文件，导致以后每次安装都会出现权限错误。
        如果你的设置需要 sudo 进行全局安装，考虑使用{" "}
        <InlineCode>nvm</InlineCode> (Node 版本管理器) 或上面的{" "}
        <InlineCode>~/.npm-global</InlineCode> prefix 方法，它们会在你的主目录中安装
        Node 和全局包，不会有权限问题。
      </Callout>

      {/* ── Issue 1 ────────────────────────────────────────────── */}
      <SubHeading>
        "Missing required environment variable: WORKSPACE_PATH"
      </SubHeading>
      <Paragraph>
        你的 <InlineCode>.env.local</InlineCode> 缺失或变量未设置。
        确保已复制 <InlineCode>.env.example</InlineCode>：
      </Paragraph>
      <CodeBlock>{`cp .env.example .env.local`}</CodeBlock>
      <Paragraph>
        然后填写值。修改 <InlineCode>.env.local</InlineCode> 后重启开发服务器。
      </Paragraph>

      {/* ── 405 Method Not Allowed ─────────────────────────────── */}
      <SubHeading>对话时出现 405 Method Not Allowed</SubHeading>
      <Paragraph>
        网关的 HTTP chat completions 端点默认是禁用的。
        在 <InlineCode>~/.openclaw/openclaw.json</InlineCode> 中启用：
      </Paragraph>
      <CodeBlock title="~/.openclaw/openclaw.json (合并到现有配置)">
        {`"gateway": {
  "http": {
    "endpoints": {
      "chatCompletions": { "enabled": true }
    }
  }
}`}
      </CodeBlock>
      <Paragraph>修改配置后重启网关。你也可以重新运行{" "}
        <InlineCode>clawport setup</InlineCode>，它会自动检测并修复这个问题。
      </Paragraph>

      {/* ── Issue 2 ────────────────────────────────────────────── */}
      <SubHeading>网关连接被拒绝 / 对话不工作</SubHeading>
      <Paragraph>OpenClaw 网关未运行。启动它：</Paragraph>
      <CodeBlock>{`openclaw gateway run`}</CodeBlock>
      <Paragraph>验证它是否可达：</Paragraph>
      <CodeBlock>{`curl http://localhost:18789/v1/models`}</CodeBlock>
      <Paragraph>
        你应该得到一个 JSON 响应。如果你修改了网关端口，将{" "}
        <InlineCode>18789</InlineCode> 替换为你的自定义端口。
        在你的 <InlineCode>.env.local</InlineCode> 中设置{" "}
        <InlineCode>OPENCLAW_GATEWAY_PORT</InlineCode> 让 ClawPort 连接到正确的端口。
      </Paragraph>

      {/* ── Issue 3 ────────────────────────────────────────────── */}
      <SubHeading>没有智能体显示</SubHeading>
      <NumberedList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              检查 WORKSPACE_PATH
            </strong>{" "}
            -- 确保它指向一个有效的 OpenClaw 工作空间目录。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              检查你的 agents.json
            </strong>{" "}
            -- 如果你在{" "}
            <InlineCode>$WORKSPACE_PATH/clawport/agents.json</InlineCode> 放置了自定义{" "}
            <InlineCode>agents.json</InlineCode>，确保它是有效的 JSON。
            语法错误会导致静默回退到打包的注册表。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              检查服务器控制台
            </strong>{" "}
            -- ClawPort 会将错误日志输出到运行{" "}
            <InlineCode>npm run dev</InlineCode> 的终端。
          </>,
        ]}
      />
      <Callout type="tip">
        用以下命令测试你的 agents.json：{" "}
        <InlineCode>
          cat $WORKSPACE_PATH/clawport/agents.json | python3 -m json.tool
        </InlineCode>
      </Callout>

      {/* ── Issue 4 ────────────────────────────────────────────── */}
      <SubHeading>智能体 SOUL.md 没有加载</SubHeading>
      <Paragraph>
        你 agents.json 中的 <InlineCode>soulPath</InlineCode> 是相对于{" "}
        <InlineCode>WORKSPACE_PATH</InlineCode> 的。如果你的工作空间在{" "}
        <InlineCode>/Users/you/.openclaw/workspace</InlineCode> 且 soulPath 是{" "}
        <InlineCode>"agents/vera/SOUL.md"</InlineCode>，ClawPort 会查找{" "}
        <InlineCode>
          /Users/you/.openclaw/workspace/agents/vera/SOUL.md
        </InlineCode>
        。
      </Paragraph>
      <Paragraph>确保该路径下文件存在。</Paragraph>

      {/* ── Issue 5 ────────────────────────────────────────────── */}
      <SubHeading>对话中图片不工作</SubHeading>
      <Paragraph>图片消息使用 CLI 管道。常见问题：</Paragraph>
      <NumberedList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              OPENCLAW_BIN 路径错误
            </strong>{" "}
            -- 运行 <InlineCode>which openclaw</InlineCode> 并更新{" "}
            <InlineCode>.env.local</InlineCode>。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              网关令牌错误
            </strong>{" "}
            -- 用{" "}
            <InlineCode>openclaw gateway status</InlineCode> 验证。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              图片太大
            </strong>{" "}
            -- ClawPort 会调整到最大 1200px，但极大的图片可能仍然超出限制。尝试更小的图片。
          </>,
        ]}
      />
      <Paragraph>
        检查服务器控制台中是否有{" "}
        <InlineCode>sendViaOpenClaw execFile error:</InlineCode> 或{" "}
        <InlineCode>E2BIG</InlineCode> 错误。
      </Paragraph>

      {/* ── Issue 6 ────────────────────────────────────────────── */}
      <SubHeading>语音/TTS 功能不工作</SubHeading>
      <Paragraph>
        语音功能需要在你的 <InlineCode>.env.local</InlineCode> 中设置{" "}
        <InlineCode>ELEVENLABS_API_KEY</InlineCode>。没有它，语音指示器不会出现在智能体配置中。
      </Paragraph>
      <Paragraph>
        音频转录 (语音转文字) 通过 OpenClaw 网关使用 Whisper，不需要单独的密钥。
      </Paragraph>

      {/* ── Issue 7 ────────────────────────────────────────────── */}
      <SubHeading>端口 3000 已被占用</SubHeading>
      <Paragraph>另一个进程正在使用端口 3000。要么停止它，要么用不同端口运行：</Paragraph>
      <CodeBlock>{`npm run dev -- -p 3001`}</CodeBlock>

      {/* ── Debug Image Pipeline ──────────────────────────────── */}
      <SubHeading>调试图片管道</SubHeading>
      <Paragraph>视觉 (图片) 对话管道的逐步调试：</Paragraph>
      <NumberedList
        items={[
          <>
            检查服务器控制台中的{" "}
            <InlineCode>sendViaOpenClaw execFile error:</InlineCode> 或{" "}
            <InlineCode>sendViaOpenClaw: timed out</InlineCode>
          </>,
          <>
            直接测试 CLI：
          </>,
        ]}
      />
      <CodeBlock title="终端">
        {`# 测试 chat.send
openclaw gateway call chat.send \\
  --params '{"sessionKey":"agent:main:clawport","idempotencyKey":"test","message":"describe","attachments":[]}' \\
  --token <token> --json

# 检查历史
openclaw gateway call chat.history \\
  --params '{"sessionKey":"agent:main:clawport"}' \\
  --token <token> --json

# 验证网关健康状态
openclaw gateway call health --token <token>`}
      </CodeBlock>

      <SubHeading>运行测试</SubHeading>
      <CodeBlock title="终端">
        {`npm test             # 通过 Vitest 运行所有测试
npx tsc --noEmit     # 类型检查 (预期 0 错误)`}
      </CodeBlock>

      <Callout type="note">
        所有测试都在 <InlineCode>lib/</InlineCode> 目录中，与源文件放在一起。
        关键测试模式包括 CLI 测试的{" "}
        <InlineCode>vi.mock('child_process')</InlineCode>、轮询测试的{" "}
        <InlineCode>vi.useFakeTimers</InlineCode>，以及环境变量测试的{" "}
        <InlineCode>vi.stubEnv()</InlineCode>。
      </Callout>
    </>
  );
}
