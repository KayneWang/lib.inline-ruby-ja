# @kaynewang/inline-ruby-ja

将日文文本中的“行内ルビ”标记（如 `漢字《かんじ》` / `｜漢字《かんじ》`）转换为 HTML `<ruby>` 标签的轻量级 TypeScript 库。

本仓库既包含：

- **库本身**：构建后输出到 `dist/inline-ruby-ja.js`
- **示例应用**：基于 Vite + Vue 3 的简单预览页面（`npm run dev`）

---

## 特性

- **行内ルビ语法支持**
  - `漢字《かんじ》`
  - `｜漢字《かんじ》`
- **多段落支持**
  - 按换行符分段，并用 `<br/>` 连接
- **安全转义**
  - 自动对文本和注音进行 HTML 转义，减少 XSS 风险
- **TypeScript 支持**
  - 使用 Vite 构建，生成 dts 类型声明，便于在 TS 项目中直接使用

---

## 安装

包名为 **`@kaynewang/inline-ruby-ja`**：

```bash
npm install @kaynewang/inline-ruby-ja
# 或
yarn add @kaynewang/inline-ruby-ja
# 或
pnpm add @kaynewang/inline-ruby-ja
```
