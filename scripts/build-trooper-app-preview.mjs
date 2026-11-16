import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const landingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const trooperRoot = path.resolve(process.env.TROOPER_APP_PATH || path.join(landingRoot, '..', 'Trooper'));
const runner = path.join(trooperRoot, 'scripts/run-with-system-node.mjs');
const vite = path.join(trooperRoot, 'node_modules/vite/bin/vite.js');
const config = path.join(landingRoot, 'scripts/trooper-app-preview.vite.config.mjs');

execFileSync(process.execPath, [runner, vite, 'build', '--config', config], {
  cwd: trooperRoot,
  stdio: 'inherit',
  env: { ...process.env, TROOPER_APP_PATH: trooperRoot },
});
