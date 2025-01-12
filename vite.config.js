import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: resolve(__dirname, "./src"),
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "./src/partials"),
      content: { username: "Test" },
    }),
  ],
  server: {
    port: 3000,
  },
});
