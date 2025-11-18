// 汉字 + 平假名 + 片假名 + 数字
export const RUBY_BASE_REGEX =
  /([\p{Script=Han}0-9\uff10-\uff19][\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}0-9\uff10-\uff19]*)$/u;

export interface RunText {
  t: "text";
  text: string;
}

export interface RunRubyWord {
  t: "ruby";
  rb: string;
  rt: string;
}

export type Run = RunText | RunRubyWord;

// AST 树
export interface RubyDoc {
  lang: "ja";
  paragraphs: Run[][];
}

export interface DocToHtmlOptions {
  lineBreak?: string; // 段落分隔符, 默认为 <br/>
}
