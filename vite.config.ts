import path from 'path';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  server: {
    port: 8080,
  },

  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    Components({
      dirs: ['./src/**/views', './src/**/components'],
      resolvers: [PrimeVueResolver()],
      dts: './src/components.d.ts',
    }),
  ],
});
