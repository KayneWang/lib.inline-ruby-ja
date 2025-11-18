<template>
  <div class="page">
    <h1>Inline Ruby Preview</h1>

    <div class="editor">
      <label for="src">Source</label>
      <textarea
        id="src"
        v-model="text"
        rows="6"
        spellcheck="false"
      ></textarea>
    </div>

    <div class="preview">
      <label>Preview</label>
      <div class="preview-box" v-html="html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { inlineToHtml } from "./lib";

const text = ref("これは｜漢字《かんじ》です\nこれは漢字《かんじ》です");

const html = computed(() => inlineToHtml(text.value));
</script>

<style scoped>
.page {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 16px 32px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

h1 {
  font-size: 20px;
  margin-bottom: 16px;
}

.editor,
.preview {
  margin-top: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.preview-box {
  min-height: 80px;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fafafa;
  font-size: 16px;
  line-height: 1.8;
}

.preview-box ruby {
  ruby-position: over;
}

.preview-box rt {
  font-size: 0.7em;
  letter-spacing: 0.04em;
  color: #4b5563;
  font-weight: 400;
  line-height: 1.2;
}
</style>