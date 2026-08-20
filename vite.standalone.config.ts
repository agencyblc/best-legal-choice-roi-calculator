import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Builds normally (separate JS/CSS assets, relative base) — the assets are
// then inlined into a single portable index.html by
// scripts/fix-standalone-html.mjs. Inlining is done by hand rather than via
// vite-plugin-singlefile, which corrupts output under this project's
// Rolldown-based build (encoding bug: inlined script came out 3.4x the raw
// chunk's byte size and failed to parse).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist-standalone',
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
})
