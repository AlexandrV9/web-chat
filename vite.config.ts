import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: resolve(__dirname, "./src"),
  build: {
    outDir: resolve(__dirname, "./dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),

        home: resolve(__dirname, "./src/pages/home/index.html"),
        signIn: resolve(__dirname, "./src/pages/sign-in/index.html"),
        signUp: resolve(__dirname, "./src/pages/sign-up/index.html"),
        profile: resolve(__dirname, "./src/pages/profile/index.html"),
        error500: resolve(__dirname, "./src/pages/500/index.html"),
        error404: resolve(__dirname, "./src/pages/404/index.html"),
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handlebars({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      partialDirectory: resolve(__dirname, "./src/partials"),
      content: { username: "Test" },
    }),
  ],
  server: {
    port: 3000,
  },
});
