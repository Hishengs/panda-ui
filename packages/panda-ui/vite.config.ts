/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const resolve = (file) => path.resolve(__dirname, file);
const version = require('./package.json').version;

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve('./'),
  resolve: {
    alias: [{ find: /^@\/(.*)/, replacement: resolve('./src/$1') }],
  },
  define: {
    __VERSION__: JSON.stringify(version),
  },
  plugins: [vue(), vueJsx({ optimize: false, enableObjectSlots: true })],
  build: {
    // minify: false,
    lib: {
      name: 'PandaUI',
      entry: resolve('./src/index'),
      formats: ['es', 'cjs', 'umd'],
    },
  },
  test: {
    /* browser: {
      enabled: true,
      name: 'chrome',
      headless: true
    }, */
    clearMocks: true,
    environment: 'jsdom',
  },
});
