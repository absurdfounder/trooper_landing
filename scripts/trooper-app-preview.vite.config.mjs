import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const landingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const trooperRoot = path.resolve(process.env.TROOPER_APP_PATH || path.join(landingRoot, '..', 'Trooper'));
const previewRoot = path.join(landingRoot, 'packages/trooper-app-preview');
const require = createRequire(path.join(trooperRoot, 'package.json'));
const react = require('@vitejs/plugin-react').default;
const tailwindcss = require('@tailwindcss/vite').default;

export default {
  root: previewRoot,
  envDir: trooperRoot,
  base: '/trooper-app-preview/',
  publicDir: false,
  plugins: [react(), tailwindcss()],
  css: { postcss: { plugins: [] } },
  resolve: {
    alias: [
      { find: '@app', replacement: trooperRoot },
      { find: '@', replacement: path.join(trooperRoot, 'src') },
      { find: 'react/jsx-runtime', replacement: path.join(trooperRoot, 'node_modules/react/jsx-runtime.js') },
      { find: 'react/jsx-dev-runtime', replacement: path.join(trooperRoot, 'node_modules/react/jsx-dev-runtime.js') },
      { find: 'react-dom', replacement: path.join(trooperRoot, 'node_modules/react-dom') },
      { find: 'react', replacement: path.join(trooperRoot, 'node_modules/react') },
      { find: 'react-router', replacement: path.join(trooperRoot, 'node_modules/react-router') },
      { find: '@tanstack/react-query', replacement: path.join(trooperRoot, 'node_modules/@tanstack/react-query') },
      { find: 'mentis', replacement: path.join(trooperRoot, 'node_modules/mentis') },
    ],
  },
  server: { fs: { allow: [trooperRoot, landingRoot] } },
  build: {
    outDir: path.join(landingRoot, 'public/trooper-app-preview'),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/trooper-preview.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (asset) => (asset.name?.endsWith('.css')
          ? 'assets/trooper-preview.css'
          : 'assets/[name]-[hash][extname]'),
      },
    },
  },
};
