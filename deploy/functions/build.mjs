import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const outfile = new URL('./dist/server.mjs', import.meta.url).pathname;
await mkdir(dirname(outfile), { recursive: true });
await build({
  entryPoints: [new URL('./server.mjs', import.meta.url).pathname],
  outfile,
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node24',
  logLevel: 'warning',
});
