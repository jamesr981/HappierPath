import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { getManifest } from './src/manifest';

function ManifestPlugin(browser: 'chrome' | 'firefox'): Plugin {
  return {
    name: 'generate-manifest',
    generateBundle() {
      const manifest = getManifest(browser);
      const outPath = path.resolve(__dirname, 'dist', 'manifest.json');
      fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
      console.log(`✅ Manifest written to: ${outPath}`);
    }
  };
}

export default defineConfig(({ mode }) => {
  const isDebug = mode === 'development';
  const browser = process.env.BROWSER === 'firefox' ? 'firefox' : 'chrome';

  return {
    plugins: [
      react(),
      ManifestPlugin(browser)
    ],
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
          assetFileNames: '[name].[ext]'
        }
      }
    }
  };
});
