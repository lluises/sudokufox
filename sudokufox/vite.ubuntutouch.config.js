// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import legacy from '@vitejs/plugin-legacy';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ 
      template: { transformAssetUrls }
    }),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),

    VueI18nPlugin({ }),

    legacy({
      targets: [
        'chrome 90',
        'not IE 11',
      ],
    }),
  ],

  build: {
    rollupOptions: {
      external: [
        /^img\/.*/,
      ]
    }
  },

  define: { 'process.env': {} },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },

  server: {
    port: 3000,
  },
});
