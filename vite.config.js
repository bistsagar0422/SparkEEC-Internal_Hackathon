import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the static build works when served from any
  // host or sub-path (root domain, GitHub Pages project site, Netlify, etc.).
  base: './',
  build: {
    outDir: 'dist',
    target: 'es2019',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 900,
    // Inline assets smaller than 4 KB as data URIs to cut request count.
    assetsInlineLimit: 4096,
  },
});
