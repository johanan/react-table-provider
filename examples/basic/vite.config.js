/* eslint-disable no-undef */
import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
        alias: {
          'react-table-provider': path.resolve(__dirname, '../../src/index.ts'),
          // test distribution files
          //'react-table-provider': path.resolve(__dirname, '../react-table-provider/'),
        },
      },
})