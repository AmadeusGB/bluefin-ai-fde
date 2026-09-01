import { execFile } from 'node:child_process';
import { cp, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const openNextRoot = resolve(projectRoot, '.open-next');
const distRoot = resolve(projectRoot, 'dist');
const serverRoot = resolve(distRoot, 'server');
const clientRoot = resolve(distRoot, 'client');

await rm(distRoot, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });
await mkdir(clientRoot, { recursive: true });

const bundleRoot = await mkdtemp(resolve(tmpdir(), 'bluefin-sites-worker-'));
try {
  await execFileAsync(
    resolve(projectRoot, 'node_modules/.bin/wrangler'),
    [
      'deploy',
      '--dry-run',
      '--config',
      resolve(projectRoot, 'wrangler.jsonc'),
      '--outdir',
      bundleRoot,
    ],
    { cwd: projectRoot },
  );
  await cp(resolve(bundleRoot, 'worker.js'), resolve(serverRoot, 'index.js'));
} finally {
  await rm(bundleRoot, { recursive: true, force: true });
}
await cp(resolve(openNextRoot, 'assets'), clientRoot, { recursive: true });
