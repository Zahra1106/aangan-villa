import { defineConfig } from 'vite';

// Inline PostCSS config so Vite does not pick up a stray postcss.config.js from a parent folder.
export default defineConfig({
  css: { postcss: { plugins: [] } },
});
