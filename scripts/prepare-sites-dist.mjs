import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const openNextRoot = resolve(projectRoot, '.open-next');
const distRoot = resolve(projectRoot, 'dist');
const serverRoot = resolve(distRoot, 'server');
const clientRoot = resolve(distRoot, 'client');

await rm(distRoot, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });
await mkdir(clientRoot, { recursive: true });

await cp(openNextRoot, serverRoot, {
  recursive: true,
  filter(source) {
    return source !== resolve(openNextRoot, 'assets');
  },
});
await cp(resolve(openNextRoot, 'worker.js'), resolve(serverRoot, 'index.js'));
await cp(resolve(openNextRoot, 'assets'), clientRoot, { recursive: true });
