# @kaynewang/inline-ruby-ja

将日文文本中的行内ルビ语法（`漢字《かんじ》`、`｜漢字《かんじ》`）批量转换为 HTML `<ruby>` 标签的轻量级 TypeScript 库。构建入口位于 `dist/index.js`，默认导出纯函数 API，可直接用于浏览器、Node.js 或任何构建流程。

> `dist/index.js` 内导出的成员：`inlineToHtml`、`parseInlineRubyToAst`，以及 `Run`、`RunText`、`RunRubyWord`、`RubyDoc` 类型。

## 功能亮点

- **覆盖常见语法**：同时支持标准写法与带前导 `｜` 的写法。
- **跨段落处理**：自动按换行拆分段落，默认使用 `<br/>` 连接。
- **安全转义**：输出前统一进行 HTML 转义，降低 XSS 风险。
- **零依赖**：纯函数实现，无额外运行时成本。
- **TypeScript 友好**：随构建产物生成 `.d.ts`，可直接获取类型定义。

## 安装

```bash
npm install @kaynewang/inline-ruby-ja
# 或
pnpm add @kaynewang/inline-ruby-ja
```

## 快速上手

### 直接生成 HTML

```ts
import { inlineToHtml } from "@kaynewang/inline-ruby-ja";

const html = inlineToHtml("漢字《かんじ》ひらがな");
// => "<ruby>漢字<rt>かんじ</rt></ruby>ひらがな"
```

### 获取结构化 AST

```ts
import { parseInlineRubyToAst } from "@kaynewang/inline-ruby-ja";

const doc = parseInlineRubyToAst("｜漢字《かんじ》\nひらがな");
/*
{
  lang: "ja",
  paragraphs: [
    [{ t: "ruby", rb: "漢字", rt: "かんじ" }],
    [{ t: "text", text: "ひらがな" }],
  ],
}
*/
```

### 自定义段落分隔符

```ts
inlineToHtml("漢字《かんじ》\n漢字《かんじ》", {
  lineBreak: "<div class='paragraph'/>",
});
// => "<ruby>漢字<rt>かんじ</rt></ruby><div class='paragraph'/><ruby>漢字<rt>かんじ</rt></ruby>"
```

## API 参考

### `inlineToHtml(text: string, options?: DocToHtmlOptions): string`

- 功能：将包含行内ルビ的文本直接转换为 HTML 字符串。
- 参数：
  - `text`：原始文本。
  - `options.lineBreak`：可选，段落之间的连接符，默认 `<br/>`。

### `parseInlineRubyToAst(text: string): RubyDoc`

- 功能：返回 `{ lang: "ja", paragraphs: Run[][] }` 结构的 AST。
- 适用场景：在渲染前对结构化数据做进一步统计、替换或导出。

### 类型导出

```ts
import type {
  RubyDoc,
  Run,
  RunRubyWord,
  RunText,
} from "@kaynewang/inline-ruby-ja";
```

`DocToHtmlOptions` 定义：

| 字段        | 类型     | 默认值  | 说明             |
| ----------- | -------- | ------- | ---------------- |
| `lineBreak` | `string` | `<br/>` | 段落之间的分隔符 |

## 运行环境

- 构建目标为 **ES Module**，入口 `dist/index.js`。
- 适用于现代浏览器与 Node.js 16+（支持 ES2020）。
- 搭配 Vite、Webpack 等工具链时可直接按模块形式导入。

## 本地开发

仓库内附带基于 Vite + Vue 3 的示例页面，可用于调试函数行为：

```bash
pnpm install
pnpm dev
```

常用脚本：

```bash
pnpm test   # 执行 Vitest 单元测试
pnpm build  # 生成 dist/index.js 及类型声明
```

## 许可证

[MIT](./LICENSE)
