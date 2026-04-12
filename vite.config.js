import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio/",
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
