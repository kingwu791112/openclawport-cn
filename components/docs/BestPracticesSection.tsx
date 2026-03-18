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
  InfoCard,
} from "./DocSection";
import { docs } from "@/lib/i18n-docs";

export function BestPracticesSection() {
  const bp = docs.bestPractices;
  return (
    <>
      <Heading>{bp.title}</Heading>
      <Paragraph>
        本指南涵盖生产级智能体团队背后的模式和约定。每个示例都使用打包注册表中的真实智能体，因此你可以看到层级、记忆、工具和定时任务是如何整合在一起的。
      </Paragraph>

      {/* ─── Hierarchy ──────────────────────────────────────── */}

      <SubHeading>层级设计</SubHeading>
      <Paragraph>
        结构良好的智能体团队遵循明确的指挥链。模式是：顶部一个协调器，中间是团队负责人，底部是专业叶级智能体。每个层级都有明确的职责。
      </Paragraph>

      <InfoCard title="三个层级">
        <Table
          headers={["层级", "角色", "示例"]}
          rows={[
            [
              "协调器",
              "顶级协调者。持有团队记忆，分配工作，提供简报。",
              <><strong key="j">Jarvis</strong> —— 根节点。reportsTo: null。</>,
            ],
            [
              "团队负责人",
              "负责一个领域。管理子团队并端到端运行管道。",
              <>
                <strong key="v">VERA</strong> (策略),{" "}
                <strong key="l">LUMEN</strong> (SEO),{" "}
                <strong key="h">HERALD</strong> (领英)
              </>,
            ],
            [
              "专家",
              "专精一件事。向上汇报，不管理他人。",
              <>
                <strong key="t">TRACE</strong> (市场研究),{" "}
                <strong key="q">QUILL</strong> (领英撰稿人),{" "}
                <strong key="s">SCOUT</strong> (内容侦查)
              </>,
            ],
          ]}
        />
      </InfoCard>

      <Paragraph>
        打包的注册表包含 22 个智能体，分为五个团队：
      </Paragraph>

      <CodeBlock title="团队结构">
        {`Jarvis (协调器)
  |
  +-- VERA (策略)
  |     +-- Robin (情报员)
  |           +-- TRACE (市场研究)
  |           +-- PROOF (验证设计)
  |
  +-- LUMEN (SEO)
  |     +-- SCOUT (内容侦查)
  |     +-- ANALYST (SEO 分析师)
  |     +-- STRATEGIST (内容策略)
  |     +-- WRITER (内容撰稿人)
  |     +-- AUDITOR (质量门禁)
  |
  +-- HERALD (领英)
  |     +-- QUILL (领英撰稿人)
  |     +-- MAVEN (领英策略师)
  |
  +-- Pulse (趋势雷达)      -- 独立
  +-- ECHO (社区声音)      -- 独立
  +-- SAGE (ICP 专家)      -- 独立
  +-- KAZE (航班监控)      -- 独立
  +-- SPARK (技术发现)     -- 独立
  +-- SCRIBE (记忆架构师)  -- 独立`}
      </CodeBlock>

      <Callout type="tip">
        独立智能体（没有直接下属）直接向协调器汇报。保持这个列表简短 —— 如果根节点有超过 8-10 个直接下属，是时候将它们分组到团队负责人下面了。
      </Callout>

      <SubHeading>层级规则</SubHeading>
      <NumberedList
        items={[
          <>
            <strong>一个根节点。</strong> 恰好一个智能体有 <InlineCode>{"\"reportsTo\": null"}</InlineCode>。这是你的协调器 (Jarvis)。
          </>,
          <>
            <strong>团队负责人拥有管道。</strong> LUMEN 拥有完整的 SEO 管道 (SCOUT 到 AUDITOR)。HERALD 拥有领英管道 (QUILL + MAVEN)。每个负责人负责端到端交付。
          </>,
          <>
            <strong>叶级智能体是专家。</strong> 他们做一件事并向上汇报。TRACE 做市场研究。QUILL 写帖子。AUDITOR 运行质量门禁。没有范围蔓延。
          </>,
          <>
            <strong>最大深度为 3。</strong> Jarvis 到 Robin 到 TRACE 是三级。再深会增加延迟和协调开销，收益甚微。
          </>,
          <>
            <strong>保持 directReports 一致。</strong> 如果智能体 B 有 <InlineCode>{"\"reportsTo\": \"A\""}</InlineCode>，那么智能体 A 的 directReports 数组必须包含 B 的 id。组织图从这些关系渲染。
          </>,
        ]}
      />

      {/* ─── SOUL.md ────────────────────────────────────────── */}

      <SubHeading>SOUL.md —— 智能体角色文档</SubHeading>
      <Paragraph>
        每个智能体都有一个 SOUL.md 文件，定义其个性、专业知识和运行约束。这不是系统提示 —— 它是一个角色文档。智能体阅读它来理解自己是谁。
      </Paragraph>

      <CodeBlock title="推荐的 SOUL.md 结构">
        {`# 智能体名称 -- 角色头衔

## 身份
智能体是谁。性格特征。沟通风格。
第一人称视角："我是 VERA，首席战略官。"

## 专长
这个智能体深入了解的领域。
什么应该咨询它，什么应该 defer 给别人。

## 运行规则
硬性约束。它必须始终/永不做的事。
输出格式要求。

## 关系
它向谁汇报。谁向它汇报。
它如何与同级智能体协作。

## 记忆
它跨会话记住什么。
它的持久知识存储在哪里。`}
      </CodeBlock>

      <BulletList
        items={[
          <>
            <strong>要具体描述性格。</strong> HERALD 被描述为傲慢直接。SAGE 深思熟虑且精确。不同的声音可以防止所有智能体听起来都一样。
          </>,
          <>
            <strong>定义智能体不做什么。</strong> SCRIBE (记忆架构师) 是一个"沉默的工作者" —— 它从不发起对话。SAGE (ICP 专家) 是只读的 —— 它从不向外部系统写入。
          </>,
          <>
            <strong>包含输出格式示例。</strong> 如果智能体生成市场简报，展示确切的格式。TRACE 返回结构化的 TAM/竞争对手/定价数据，而不是散文。
          </>,
          <>
            <strong>保持在 500 行以下。</strong> 冗长的 SOUL 文件会分散智能体的注意力。如果需要更多细节，链接到参考文档。
          </>,
        ]}
      />

      <Callout type="note">
        SOUL.md 文件位于你的 OpenClaw 工作空间中，路径由每个智能体的 <InlineCode>soulPath</InlineCode> 字段定义。ClawPort 读取并显示在智能体详情页上。
      </Callout>

      {/* ─── Naming ─────────────────────────────────────────── */}

      <SubHeading>命名规范</SubHeading>
      <Paragraph>
        智能体命名遵循一种简单的模式，一眼就能看出智能体的范围：
      </Paragraph>

      <Table
        headers={["模式", "何时使用", "示例"]}
        rows={[
          [
            "大写",
            "作为管道或团队一部分的智能体。像呼号一样。",
            "VERA, LUMEN, HERALD, SCOUT, QUILL, ECHO, SAGE",
          ],
          [
            "首字母大写",
            "更具个性的独立智能体。协调器或个人风格的智能体。",
            "Jarvis, Robin, Pulse",
          ],
        ]}
      />

      <Paragraph>
        ID 始终是小写 slug：<InlineCode>vera</InlineCode>、<InlineCode>lumen</InlineCode>、<InlineCode>herald</InlineCode>。{" "}
        <InlineCode>name</InlineCode> 字段中的显示名称是用户在 UI 中看到的。
      </Paragraph>

      {/* ─── Tools ──────────────────────────────────────────── */}

      <SubHeading>工具分配</SubHeading>
      <Paragraph>
        遵循最小权限原则。每个智能体只获得其工作所需的工具 —— 不多不少。
      </Paragraph>

      <Table
        headers={["工具", "用途", "谁获得"]}
        rows={[
          [
            <InlineCode key="r">read</InlineCode>,
            "读取工作空间中的文件",
            "几乎所有人。基础能力。",
          ],
          [
            <InlineCode key="w">write</InlineCode>,
            "写入/创建文件",
            "产出工件的智能体 (WRITER, ANALYST, STRATEGIST)",
          ],
          [
            <InlineCode key="e">exec</InlineCode>,
            "运行 shell 命令",
            "运行管道的协调器 + 负责人 (Jarvis, LUMEN, HERALD)",
          ],
          [
            <InlineCode key="ws">web_search</InlineCode>,
            "网络搜索",
            "研究类智能体 (TRACE, Robin, SCOUT, Pulse, SPARK)",
          ],
          [
            <InlineCode key="wf">web_fetch</InlineCode>,
            "获取特定 URL",
            "抓取或监控的智能体 (ECHO, KAZE, Robin)",
          ],
          [
            <InlineCode key="m">message</InlineCode>,
            "向其他智能体发送消息",
            "协调的智能体 (Jarvis, Robin, Pulse, HERALD)",
          ],
          [
            <InlineCode key="ss">sessions_spawn</InlineCode>,
            "生成子智能体会话",
            "仅协调器 + 团队负责人 (Jarvis, VERA)",
          ],
          [
            <InlineCode key="ms">memory_search</InlineCode>,
            "搜索团队记忆",
            "仅协调器 (Jarvis)",
          ],
          [
            <InlineCode key="tt">tts</InlineCode>,
            "文字转语音",
            "仅协调器 (Jarvis)",
          ],
        ]}
      />

      <Callout type="warning">
        给叶级智能体 <InlineCode>exec</InlineCode> 几乎总是一个错误。如果一个专家需要运行命令，它应该请求其团队负责人来做。这保持爆炸半径小。
      </Callout>

      <InfoCard title="工具分配示例">
        <CodeBlock>
          {`// SAGE -- 只读知识智能体
"tools": ["read"]

// SCOUT -- 网络研究员
"tools": ["web_search", "web_fetch", "read"]

// WRITER -- 内容生产者
"tools": ["read", "write"]

// HERALD -- 运行管道的团队负责人
"tools": ["web_search", "web_fetch", "read", "write", "message", "exec"]

// Jarvis -- 具有完全访问权限的协调器
"tools": ["exec", "read", "write", "edit", "web_search", "tts", "message", "sessions_spawn", "memory_search"]`}
        </CodeBlock>
      </InfoCard>

      {/* ─── Memory ─────────────────────────────────────────── */}

      <SubHeading>记忆架构</SubHeading>
      <Paragraph>
        智能体记忆使用三级系统。每一级服务不同的目的，共同赋予智能体短期召回和长期知识。
      </Paragraph>

      <InfoCard title="三级记忆">
        <Table
          headers={["层级", "内容", "生命周期", "管理者"]}
          rows={[
            [
              "1. 每日日志",
              "每个智能体会话的原始输出。未编辑，带时间戳。",
              "7-14 天（然后压缩或归档）",
              "每个智能体自己写入",
            ],
            [
              "2. MEMORY.md",
              "精选的压缩知识。智能体的持久大脑。",
              "无限（每周更新）",
              <>
                <strong>SCRIBE</strong> 运行每周压缩
              </>,
            ],
            [
              "3. 团队记忆",
              "跨智能体共享的知识。市场数据、ICP 资料、策略文档。",
              "无限",
              "团队负责人 + 协调器",
            ],
          ]}
        />
      </InfoCard>

      <SubHeading>第一级：每日日志</SubHeading>
      <Paragraph>
        每次智能体运行时，它都会写入一个日志文件。这些是原始会话记录 —— 智能体做了什么，发现了什么，产出了什么。每日日志量大但编辑度低。
      </Paragraph>
      <CodeBlock title="每日日志路径模式">
        {`$WORKSPACE_PATH/agents/<agent-id>/logs/YYYY-MM-DD.md`}
      </CodeBlock>

      <SubHeading>第二级：MEMORY.md</SubHeading>
      <Paragraph>
        每个智能体都有一个 MEMORY.md 文件，在会话之间持久化其关键知识。与每日日志（原始的）不同，MEMORY.md 是精选的 —— 只有重要的模式、决策和事实才能存活。
      </Paragraph>
      <CodeBlock title="MEMORY.md 结构">
        {`# 智能体名称 -- 记忆

## 关键模式
- 模式 1 在 3+ 会话中确认
- 模式 2 来自上周的研究

## 活跃上下文
- 当前项目状态
- 开放问题 / 阻碍

## 学到的偏好
- 用户更喜欢 X 而不是 Y
- 输出时总是包含 Z`}
      </CodeBlock>
      <Paragraph>
        <strong>SCRIBE</strong> (记忆架构师) 每周运行，将每日日志压缩到每个智能体的 MEMORY.md。SCRIBE 读取原始日志，提取持久洞察，并更新记忆文件 —— 丢弃会话特定的噪音。这使 MEMORY.md 简洁且高信号。
      </Paragraph>

      <SubHeading>第三级：团队记忆（共享）</SubHeading>
      <Paragraph>
        有些知识需要在智能体之间共享。市场情报、ICP 资料、竞争分析和品牌声音文档都存在于共享的团队记忆目录中。任何有{" "}
        <InlineCode>read</InlineCode> 工作空间权限的智能体都可以引用这些文件。
      </Paragraph>
      <CodeBlock title="团队记忆路径">
        {`$WORKSPACE_PATH/team-memory/
  market-brief.md       -- TRACE 的最新研究
  icp-profile.md        -- SAGE 的 ICP 知识
  competitor-map.md      -- Robin 的竞争情报
  brand-voice.md        -- 内容智能体的声音配置
  content-calendar.md   -- MAVEN 的编辑日历`}
      </CodeBlock>

      <Callout type="tip">
        团队记忆文件是智能体之间的粘合剂。当 STRATEGIST 需要市场背景时，它读取 TRACE 的市场简报。当 WRITER 需要品牌声音时，它读取声音配置文件。不需要智能体到智能体的 API 调用 —— 只需共享文件。
      </Callout>

      {/* ─── Communication ──────────────────────────────────── */}

      <SubHeading>智能体通信</SubHeading>
      <Paragraph>
        智能体通过文件通信，而不是直接调用 API。这是故意的 —— 基于文件的通信可调试、可审计，不会造成紧密耦合。
      </Paragraph>

      <NumberedList
        items={[
          <>
            <strong>上游（向上汇报）：</strong> 智能体将输出写入文件。团队负责人或协调器在下次运行时读取它。示例：SCOUT 写入主题建议，LUMEN 读取它们来给 STRATEGIST 简报。
          </>,
          <>
            <strong>下游（委派）：</strong> 团队负责人写入简报文件，专家读取它。示例：HERALD 写入角度简报，QUILL 读取它并起草帖子。
          </>,
          <>
            <strong>跨团队（共享上下文）：</strong> 智能体从 team-memory 读取。示例：STRATEGIST 读取 SAGE 的 ICP 资料和 ECHO 的社区声音数据来选择正确的内容角度。
          </>,
        ]}
      />

      <Callout type="note">
        <InlineCode>message</InlineCode> 工具存在用于实时协调（例如 Pulse 向 LUMEN 发送关于热门话题的提醒），但默认通信渠道始终是文件。消息用于紧急情况；文件用于实质内容。
      </Callout>

      {/* ─── Crons ──────────────────────────────────────────── */}

      <SubHeading>Cron 模式</SubHeading>
      <Paragraph>
        Cron 任务是自主智能体团队的心跳。每个 cron 遵循相同的理念：一次获取，一次决策，一次输出。
      </Paragraph>

      <BulletList
        items={[
          <>
            <strong>将 cron 分配到正确的层级。</strong> 研究 cron 放在叶级智能体上 (SCOUT, TRACE, ECHO)。管道 cron 放在团队负责人上 (LUMEN, HERALD)。简报 cron 放在协调器上 (Jarvis)。
          </>,
          <>
            <strong>错开时间表。</strong> 不要同时运行所有 cron。隔开时间，让上游智能体在下游智能体读取其输出之前完成。
          </>,
          <>
            <strong>保持 cron 专注。</strong> 每个 cron 做一件事。"扫描 subreddit" 是一个好的 cron。"扫描 subreddit、分析情感、写博客并发布"是四个 cron 假装成一个。
          </>,
          <>
            <strong>错误隔离。</strong> 如果 cron 失败，它应该只影响自己的输出。其他智能体读取过期数据比级联失败好。
          </>,
        ]}
      />

      <Table
        headers={["Cron", "智能体", "时间表", "模式"]}
        rows={[
          [
            "社区扫描",
            <strong key="e">ECHO</strong>,
            "每周",
            "获取 subreddit 帖子，提取客户语言，写入 team-memory",
          ],
          [
            "趋势雷达",
            <strong key="p">Pulse</strong>,
            "隔天",
            "扫描热门信号，写入热门话题文件，如紧急则通知 LUMEN",
          ],
          [
            "航班监控",
            <strong key="k">KAZE</strong>,
            "每天",
            "检查航班价格，如发现低于阈值的优惠则通知 Jarvis",
          ],
          [
            "记忆压缩",
            <strong key="s">SCRIBE</strong>,
            "每周",
            "读取每日日志，压缩到 MEMORY.md，归档旧日志",
          ],
          [
            "内容管道",
            <strong key="l">LUMEN</strong>,
            "每周",
            "协调 SCOUT -> ANALYST -> STRATEGIST -> WRITER -> AUDITOR",
          ],
        ]}
      />

      {/* ─── Voice ──────────────────────────────────────────── */}

      <SubHeading>语音系统</SubHeading>
      <Paragraph>
        直接与操作员交互的智能体可以分配 ElevenLabs 语音 ID。这在对话界面中启用其响应的文字转语音。不是每个智能体都需要语音 —— 只有操作员定期交谈的那些。
      </Paragraph>

      <BulletList
        items={[
          <>
            <strong>给对话型智能体语音。</strong> Jarvis (协调器)、VERA (策略顾问)、Pulse (趋势提醒) —— 你与之聊天的智能体受益于语音。
          </>,
          <>
            <strong>跳过管道工作者的语音。</strong> SCOUT、ANALYST、WRITER、AUDITOR 在管道中运行，很少需要说话。不要在他们身上浪费语音槽。
          </>,
          <>
            对于没有语音的智能体，将 <InlineCode>voiceId</InlineCode> 设置为 <InlineCode>null</InlineCode>。当 voiceId 为 null 时，UI 会隐藏 TTS 按钮。
          </>,
        ]}
      />

      {/* ─── Design Principles ──────────────────────────────── */}

      <SubHeading>设计原则</SubHeading>

      <InfoCard title="1. 智能体是角色，不是功能">
        <Paragraph>
          每个智能体都有一个名字、一个性格和一个角色头衔。它们不是可互换的工作线程 —— 它们是具有独特专业知识的团队成员。VERA 战略性地思考。ECHO 倾听社区。KAZE 监控航班。这使团队清晰易懂且令人难忘。
        </Paragraph>
      </InfoCard>

      <InfoCard title="2. 始终最小权限">
        <Paragraph>
          智能体应该正好拥有它需要的工具，别无其他。SAGE 是只读的，因为它是一个知识库，而不是一个行动者。SCRIBE 有 <InlineCode>exec</InlineCode>，因为它在记忆压缩期间需要运行文件操作。如果你不确定智能体是否需要某个工具，先不加。之后可以随时添加。
        </Paragraph>
      </InfoCard>

      <InfoCard title="3. 文件优于消息">
        <Paragraph>
          优先使用基于文件的通信而不是实时消息。文件可检查、可比较，并跨会话持久化。消息仅用于紧急信号（例如 Pulse 关于突发趋势的提醒）。其他一切都通过 team-memory 中的共享文件进行。
        </Paragraph>
      </InfoCard>

      <InfoCard title="4. 一个智能体，一个工作">
        <Paragraph>
          抵制制造瑞士军刀式智能体的冲动。TRACE 做市场研究 —— 它不也写博客。QUILL 写领英帖子 —— 它也不分析指标。当一个智能体的描述需要多次使用"和"这个词时，将其拆分成两个智能体。
        </Paragraph>
      </InfoCard>

      <InfoCard title="5. 最大深度为 3">
        <Paragraph>
          Jarvis 到 Robin 到 TRACE 是三级。再深会增加延迟，使指挥链混乱。如果你需要更多专业化，添加横向智能体（更多直接下属）而不是更深的嵌套。
        </Paragraph>
      </InfoCard>

      <InfoCard title="6. 让 SCRIBE 处理记忆">
        <Paragraph>
          不要让每个智能体管理自己的记忆压缩。SCRIBE 的存在专门是为了读取每日日志、提取模式并更新 MEMORY.md 文件。这种单一责任保持记忆一致，防止智能体在 housekeeping 上花费周期而不是实际工作。
        </Paragraph>
      </InfoCard>
    </>
  );
}
