import { RUBY_BASE_REGEX } from "./common";
import type { Run, RubyDoc, RunText } from "./common";

/**
 * 解析文本：将文本中的注音语法 `汉字《rt》` 转换为 AST
 *
 * 例："纳得《なっとく》" -> [{t: 'ruby', rb: '纳得', rt: 'なっとく'}]
 */
export function parseInlineRubyToAst(input: string): RubyDoc {
  const paragraphs = input
    .split(/\n{1,}/) // 按空行分段
    .map((s) => s.trim())
    .filter(Boolean);

  const result: RubyDoc = {
    lang: "ja",
    paragraphs: paragraphs.map(parseInlineRubyToRuns),
  };

  return result;
}

/**
 * 解析段落
 *
 * @param text - 段落文本
 * @returns 段落 AST
 */
export function parseInlineRubyToRuns(text: string): Run[] {
  const runs: Run[] = [];
  let position = 0;

  // 辅助函数：添加纯文本节点
  const addText = (s: string) => {
    if (s) runs.push({ t: "text", text: s });
  };

  // 辅助函数：提取 `《...》` 前的相邻 CJK 字符（被注音对象）
  const extractRubyBase = (
    textBefore: string
  ): { rb: string; splitIndex: number } | null => {
    // 若存在前导「｜」，优先以其为起点
    const pipeIndex = textBefore.lastIndexOf("｜");

    if (pipeIndex !== -1) {
      const afterPipe = textBefore.slice(pipeIndex + 1);
      const match = afterPipe.match(RUBY_BASE_REGEX);
      if (!match) return null;
      return {
        rb: match[0],
        // 前导「｜」及其后的内容都将被替换为 ruby，不再作为纯文本输出
        splitIndex: pipeIndex,
      };
    }

    const match = textBefore.match(RUBY_BASE_REGEX);
    if (!match) return null;

    const rb = match[0];
    return {
      rb,
      // 无「｜」时，保留 rb 之前的文本为纯文本
      splitIndex: textBefore.length - rb.length,
    };
  };

  while (position < text.length) {
    // 查找下一个 `《`
    const openBrace = text.indexOf("《", position);
    if (openBrace === -1) {
      // 没有更多注音，剩余全部作为纯文本
      addText(text.slice(position));
      break;
    }

    // 查找对应的 `》`
    const closeBrace = text.indexOf("》", openBrace + 1);
    if (closeBrace === -1) {
      // 括号不匹配，剩余全部作为纯文本
      addText(text.slice(position));
      break;
    }

    // 提取 `《` 前的文本
    const textBefore = text.slice(position, openBrace);
    addText(textBefore);

    // 尝试向前查找被注音的 CJK 字符
    const rubyBaseInfo = extractRubyBase(textBefore);

    if (!rubyBaseInfo) {
      // 没有找到 CJK 字符，说明 `《...》` 不是注音语法，当作普通文本
      const lastRun = runs[runs.length - 1];
      const chunk = text.slice(openBrace, closeBrace + 1);

      if (lastRun && lastRun.t === "text") {
        lastRun.text += chunk;
      } else {
        addText(chunk);
      }

      position = closeBrace + 1;
      continue;
    }

    // 找到了 CJK 字符，从最后一个纯文本节点中拆分出 rb
    const lastTextRun = runs.pop() as RunText;
    const textBeforeRubyBase = lastTextRun.text.slice(
      0,
      rubyBaseInfo.splitIndex
    );
    if (textBeforeRubyBase) {
      addText(textBeforeRubyBase);
    }

    // 提取注音内容
    const rubyText = text.slice(openBrace + 1, closeBrace);

    runs.push({
      t: "ruby",
      rb: rubyBaseInfo.rb,
      rt: rubyText,
    });

    position = closeBrace + 1;
  }

  return runs;
}
