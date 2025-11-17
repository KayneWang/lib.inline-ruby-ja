import { describe, it, expect } from "vitest";
import { inlineToHtml } from "./inline-ruby-ja";

describe("inlineToHtml", () => {
  it("｜漢字《かんじ》", () => {
    expect(inlineToHtml("｜漢字《かんじ》")).toBe(
      "<ruby>漢字<rt>かんじ</rt></ruby>"
    );
  });

  it("漢字《かんじ》", () => {
    expect(inlineToHtml("漢字《かんじ》")).toBe(
      "<ruby>漢字<rt>かんじ</rt></ruby>"
    );
  });

  it("ひらがな｜漢字《かんじ》", () => {
    expect(inlineToHtml("ひらがな｜漢字《かんじ》")).toBe(
      "ひらがな<ruby>漢字<rt>かんじ</rt></ruby>"
    );
  });

  it("｜漢字《かんじ》ひらがな", () => {
    expect(inlineToHtml("漢字《かんじ》ひらがな")).toBe(
      "<ruby>漢字<rt>かんじ</rt></ruby>ひらがな"
    );
  });

  it("カタカナ｜漢字《かんじ》", () => {
    expect(inlineToHtml("カタカナ｜漢字《かんじ》")).toBe(
      "カタカナ<ruby>漢字<rt>かんじ</rt></ruby>"
    );
  });

  it("｜漢字《かんじ》カタカナ", () => {
    expect(inlineToHtml("｜漢字《かんじ》カタカナ")).toBe(
      "<ruby>漢字<rt>かんじ</rt></ruby>カタカナ"
    );
  });

  it("1月《いちがつ》", () => {
    expect(inlineToHtml("1月《いちがつ》")).toBe(
      "<ruby>1月<rt>いちがつ</rt></ruby>"
    );
  });

  it("1 日《にち》", () => {
    expect(inlineToHtml("1 日《にち》")).toBe("1 <ruby>日<rt>にち</rt></ruby>");
  });

  it("换行符分段", () => {
    expect(inlineToHtml("漢字《かんじ》\n漢字《かんじ》")).toBe(
      "<ruby>漢字<rt>かんじ</rt></ruby><br/><ruby>漢字<rt>かんじ</rt></ruby>"
    );
  });
});
