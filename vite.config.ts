import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslint({
      build: true,
      dev: true,
      cache: false,
    }),
    checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[path][name]__[local]--[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
