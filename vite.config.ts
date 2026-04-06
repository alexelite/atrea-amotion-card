import { defineConfig } from "vite";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const buildDate = new Date().toISOString();

export default defineConfig({
  plugins: [
    {
      name: "prepend-build-date",
      writeBundle() {
        const outputPath = resolve("dist/atrea-amotion-card.js");
        const source = readFileSync(outputPath, "utf8");
        if (source.startsWith("/* build-date: ")) {
          return;
        }
        writeFileSync(outputPath, `/* build-date: ${buildDate} */\n${source}`, "utf8");
      },
    },
  ],
  build: {
    target: "es2022",
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/atrea-amotion-card.ts",
      formats: ["es"],
      fileName: () => "atrea-amotion-card.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
