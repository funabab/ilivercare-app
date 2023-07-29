import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6',
  },
  plugins: [
    react(),
    legacy({
      targets: [
        'chrome >= 64',
        'edge >= 79',
        'safari >= 11.1',
        'firefox >= 67',
      ],
      ignoreBrowserslistConfig: true,
      renderLegacyChunks: true,
      modernPolyfills: ['es/global-this'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
