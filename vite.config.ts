import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => {
  const isDebug = mode === 'development';
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: isDebug,
      minify: !isDebug,
      rollupOptions: {
        input: {
          popup: 'popup.html',
          background: 'src/background.ts'
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
      },
    },
  };
})
