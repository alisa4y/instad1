import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import solidSvg from "vite-plugin-solid-svg"

export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [solidPlugin(), solidSvg()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    assetsDir: "assets",
  },
})
