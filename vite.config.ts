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
      entry: resolve(__dirname, "src/lib/inline-ruby-ja.ts"),
      formats: ["es"],
      fileName: "inline-ruby-ja",
    },
  },
  plugins: [
    vue(),
    dts({
      include: [resolve(__dirname, "src/lib/inline-ruby-ja.ts")],
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
