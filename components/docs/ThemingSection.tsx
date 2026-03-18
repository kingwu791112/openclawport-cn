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

export function ThemingSection() {
  const theme = docs.theming;
  return (
    <>
      <Heading>{theme.title}</Heading>
      <Paragraph>
        ClawPort 的视觉主题完全由 CSS 自定义属性和两个 React Context Provider 驱动：ThemeProvider 和 SettingsProvider。
        五个内置主题通过侧边栏主题选择器切换。
      </Paragraph>

      <SubHeading>可用主题</SubHeading>
      <Table
        headers={["ID", "标签", "说明"]}
        rows={[
          [
            <InlineCode key="d">dark</InlineCode>,
            "深色",
            "Apple 深色模式。默认主题。",
          ],
          [
            <InlineCode key="g">glass</InlineCode>,
            "毛玻璃",
            "带半透明表面的毛玻璃深色变体。",
          ],
          [
            <InlineCode key="c">color</InlineCode>,
            "彩色",
            "充满活力的紫靛色变体。",
          ],
          [
            <InlineCode key="l">light</InlineCode>,
            "浅色",
            "Apple 浅色模式。",
          ],
          [
            <InlineCode key="s">system</InlineCode>,
            "跟随系统",
            "跟随操作系统偏好配色方案设置。",
          ],
        ]}
      />

      <SubHeading>三层系统</SubHeading>
      <NumberedList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              &lt;html&gt; 上的 data-theme 属性
            </strong>{" "}
            -- 每个主题定义一个作用域为 <InlineCode>[data-theme="id"]</InlineCode> 的 CSS 规则块。
            深色主题也匹配 <InlineCode>:root</InlineCode>。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              CSS 自定义属性
            </strong>{" "}
            -- 每个颜色、阴影、圆角和材质都表示为一个 CSS 变量。组件通过内联样式使用这些变量。
            不直接使用 Tailwind 颜色类。
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>
              ThemeProvider
            </strong>{" "}
            (<InlineCode>app/providers.tsx</InlineCode>) -- 管理主题状态的 React Context，
            读写 localStorage，并在 &lt;html&gt; 上设置 data-theme 属性。
          </>,
        ]}
      />

      <SubHeading>CSS 自定义属性</SubHeading>

      <InfoCard title="背景色">
        <Table
          headers={["Token", "用途", "深色示例"]}
          rows={[
            [<InlineCode key="b">--bg</InlineCode>, "主要页面背景", "#000000"],
            [
              <InlineCode key="bs">--bg-secondary</InlineCode>,
              "卡片 / 表面背景",
              "rgba(28,28,30,1)",
            ],
            [
              <InlineCode key="bt">--bg-tertiary</InlineCode>,
              "嵌套表面",
              "rgba(44,44,46,1)",
            ],
          ]}
        />
      </InfoCard>

      <InfoCard title="材质（Apple 半透明表面）">
        <Table
          headers={["Token", "用途"]}
          rows={[
            [
              <InlineCode key="mr">--material-regular</InlineCode>,
              "标准材质（侧边栏、浮层）",
            ],
            [
              <InlineCode key="mt">--material-thick</InlineCode>,
              "浓密材质",
            ],
            [
              <InlineCode key="mn">--material-thin</InlineCode>,
              "浅色着色材质",
            ],
            [
              <InlineCode key="mu">--material-ultra-thin</InlineCode>,
              "非常细微的着色",
            ],
          ]}
        />
      </InfoCard>

      <InfoCard title="文字与填充">
        <Table
          headers={["Token", "用途"]}
          rows={[
            [
              <InlineCode key="tp">--text-primary</InlineCode>,
              "标题、正文文字",
            ],
            [
              <InlineCode key="ts">--text-secondary</InlineCode>,
              "标签、辅助文字",
            ],
            [
              <InlineCode key="tt">--text-tertiary</InlineCode>,
              "占位符、说明文字",
            ],
            [
              <InlineCode key="fp">--fill-primary</InlineCode>,
              "主要交互填充（按钮）",
            ],
            [
              <InlineCode key="fs">--fill-secondary</InlineCode>,
              "悬停填充",
            ],
            [
              <InlineCode key="ft">--fill-tertiary</InlineCode>,
              "细微填充（输入框背景）",
            ],
          ]}
        />
      </InfoCard>

      <InfoCard title="强调色与系统颜色">
        <Table
          headers={["Token", "用途"]}
          rows={[
            [
              <InlineCode key="a">--accent</InlineCode>,
              "主要品牌强调色（按钮、激活状态）",
            ],
            [
              <InlineCode key="af">--accent-fill</InlineCode>,
              "15% 透明度的强调色（背景）",
            ],
            [<InlineCode key="sb">--system-blue</InlineCode>, "链接、焦点环"],
            [<InlineCode key="sg">--system-green</InlineCode>, "成功、激活开关"],
            [<InlineCode key="sr">--system-red</InlineCode>, "错误、破坏性操作"],
            [<InlineCode key="so">--system-orange</InlineCode>, "警告"],
            [<InlineCode key="sp">--system-purple</InlineCode>, "标签、高亮"],
          ]}
        />
      </InfoCard>

      <InfoCard title="代码块">
        <Table
          headers={["Token", "用途"]}
          rows={[
            [<InlineCode key="cb">--code-bg</InlineCode>, "代码块背景"],
            [<InlineCode key="cbd">--code-border</InlineCode>, "代码块边框"],
            [<InlineCode key="ct">--code-text</InlineCode>, "代码文字颜色"],
          ]}
        />
      </InfoCard>

      <SubHeading>强调色覆盖</SubHeading>
      <Paragraph>
        当用户在设置中选择自定义强调色时，SettingsProvider 会将其作为内联样式应用到 <InlineCode>document.documentElement</InlineCode>，
        覆盖主题的 <InlineCode>--accent</InlineCode> 和 <InlineCode>--accent-fill</InlineCode>。
        将其设置为 null 可恢复到主题默认值。
      </Paragraph>

      <SubHeading>添加新主题</SubHeading>
      <NumberedList
        items={[
          <>
            在 <InlineCode>lib/themes.ts</InlineCode> 中将主题 ID 添加到 <InlineCode>ThemeId</InlineCode> 类型联合和 <InlineCode>THEMES</InlineCode> 数组。
          </>,
          <>
            在 <InlineCode>app/globals.css</InlineCode> 中添加 <InlineCode>[data-theme="name"]</InlineCode> 块，
            定义每个 CSS 自定义属性 token。以深色主题块为起点。
          </>,
          "（可选）添加主题特定覆盖（body 背景渐变、组件样式）。",
          "ThemeProvider、引导向导和设置页面将自动识别新主题。",
        ]}
      />

      <Callout type="tip">
        缺失的 token 会导致组件以错误的样式渲染。创建新主题时始终定义每个 token —— 以深色主题块作为完整模板。
      </Callout>

      <SubHeading>间距与排版</SubHeading>
      <BulletList
        items={[
          <>
            <strong style={{ color: "var(--text-primary)" }}>间距</strong>{" "}
            -- 4px 网格：<InlineCode>--space-1</InlineCode> (4px) 到 <InlineCode>--space-16</InlineCode> (64px)
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>排版</strong>{" "}
            -- Apple HIG 字号：<InlineCode>--text-caption2</InlineCode> (11px) 到 <InlineCode>--text-large-title</InlineCode> (34px)
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>圆角</strong>{" "}
            -- <InlineCode>--radius-sm</InlineCode> (6px) 到 <InlineCode>--radius-2xl</InlineCode> (24px)
          </>,
          <>
            <strong style={{ color: "var(--text-primary)" }}>缓动</strong>{" "}
            -- <InlineCode>--ease-spring</InlineCode>（弹性）、<InlineCode>--ease-smooth</InlineCode>（平滑）、<InlineCode>--ease-snappy</InlineCode>（快速）
          </>,
        ]}
      />
    </>
  );
}
