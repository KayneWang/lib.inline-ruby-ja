import type { Run, RubyDoc, DocToHtmlOptions } from "./common";
import { parseInlineRubyToAst } from "./inline.to.ast";

/**
 * 将单个 Run 转换为 HTML
 */
function runToHtml(r: Run): string {
  const esc = (s: string) =>
    // HTML 转义
    s.replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] || c)
    );

  if (r.t === "text") return esc(r.text);
  return `<ruby>${esc(r.rb)}<rt>${esc(r.rt)}</rt></ruby>`;
}

/**
 * 将 AST 转成 HTML
 */
export function docToHtml(doc: RubyDoc, options?: DocToHtmlOptions): string {
  return doc.paragraphs
    .map((runs) => runs.map(runToHtml).join(""))
    .join(options?.lineBreak || "<br/>");
}

/**
 * 将文本转换为 HTML
 */
export function inlineToHtml(text: string, options?: DocToHtmlOptions): string {
  if (!text) return "";
  const doc = parseInlineRubyToAst(text);
  return docToHtml(doc, options);
}
