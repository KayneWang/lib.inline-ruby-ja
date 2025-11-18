import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [
    vue(),
    dts({
      include: [
        resolve(__dirname, "src/lib/index.ts"),
        resolve(__dirname, "src/lib/ast.to.html.ts"),
        resolve(__dirname, "src/lib/common.ts"),
        resolve(__dirname, "src/lib/inline.to.ast.ts"),
      ],
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
