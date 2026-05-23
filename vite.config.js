/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyComponentLib',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'prop-types'],
      output: [
        {
          format: 'es',
          entryFileNames: 'my-lib.es.js',
          dir: 'dist',
        },
        {
          format: 'umd',
          entryFileNames: 'my-lib.umd.js',
          dir: 'dist',
          name: 'MyComponentLib',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'prop-types': 'PropTypes',
          },
        }
      ],
    }
  }
});