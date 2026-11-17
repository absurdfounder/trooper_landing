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
        // Content-hash the entry as well as lazy chunks so the preview can be
        // cached across visits without serving stale application code.
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Match the app build: split only framework and Firebase startup code.
        // Heavy editor/video libraries remain behind their existing lazy imports.
        manualChunks(id) {
          if (!id.includes('node_modules/')) return undefined;
          const pkg = id.split('node_modules/').pop() || '';
          if (pkg.startsWith('firebase/') || pkg.startsWith('@firebase/')) return 'firebase';
          if (
            pkg.startsWith('react/')
            || pkg.startsWith('react-dom/')
            || pkg.startsWith('scheduler/')
            || pkg.startsWith('react-router/')
            || pkg.startsWith('react-router-dom/')
          ) return 'react';
          return undefined;
        },
      },
    },
  },
};
