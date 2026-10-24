// Production build. Picks an absolute baseURL (sitemap, canonical and OG need one):
//   1. HUGO_BASEURL, if set (your final domain)
//   2. on Cloudflare Pages: the project's pages.dev address for the production branch,
//      the deployment URL for preview branches
//   3. otherwise the relative "/" from hugo.toml
// Preview branches get params.noindex, so robots.txt and <meta robots> block indexing.
import { spawnSync } from 'node:child_process';

const env = process.env;
const productionBranch = env.PRODUCTION_BRANCH || 'main';
const branch = env.CF_PAGES_BRANCH;
const isPreview = Boolean(branch) && branch !== productionBranch;

let baseURL = env.HUGO_BASEURL;
if (!baseURL && env.CF_PAGES_URL) {
  const url = new URL(env.CF_PAGES_URL);
  const labels = url.hostname.split('.');
  // https://<hash>.<project>.pages.dev → https://<project>.pages.dev
  if (!isPreview && labels.length === 4 && url.hostname.endsWith('.pages.dev')) {
    url.hostname = labels.slice(1).join('.');
  }
  baseURL = `${url.origin}/`;
}

const args = ['--gc', '--minify'];
if (baseURL) args.push('--baseURL', baseURL);

console.log(`[build] baseURL=${baseURL || '(relative)'} noindex=${isPreview}`);

const childEnv = { ...env };
if (isPreview) childEnv.HUGO_PARAMS_NOINDEX = 'true';
else delete childEnv.HUGO_PARAMS_NOINDEX;

const result = spawnSync('hugo', args, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: childEnv,
});
process.exit(result.status ?? 1);
