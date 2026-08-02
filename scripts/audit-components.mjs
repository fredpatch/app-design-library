import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE_ROOTS = ['apps', 'packages'];
const TEXT_EXTENSIONS = new Set(['.css', '.ts', '.tsx']);
const TOKEN_DEFINITION = /(--[a-z0-9-]+)\s*:/gi;
const TOKEN_USAGE = /var\(\s*(--[a-z0-9-]+)/gi;
const RUNTIME_TOKEN_PREFIXES = ['--radix-'];

const broadSelectorPatterns = [
  /\.[a-z0-9_-]+\s+(input|select|textarea|button)\b/gi,
  /\.[a-z0-9_-]+\s+\*/gi,
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'storybook-static') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(absolute);
  }

  return files;
}

function lineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

function isRuntimeToken(token) {
  return RUNTIME_TOKEN_PREFIXES.some((prefix) => token.startsWith(prefix));
}

const existingRoots = [];
for (const sourceRoot of SOURCE_ROOTS) {
  const absolute = path.join(ROOT, sourceRoot);
  try {
    await fs.access(absolute);
    existingRoots.push(absolute);
  } catch {
    // A workspace root may intentionally be absent in a partial checkout.
  }
}

const files = (await Promise.all(existingRoots.map(walk))).flat();
const definitions = new Set();
const usages = [];
const selectorWarnings = [];

for (const file of files) {
  const content = await fs.readFile(file, 'utf8');
  const relative = path.relative(ROOT, file).replaceAll(path.sep, '/');

  for (const match of content.matchAll(TOKEN_DEFINITION)) definitions.add(match[1]);
  for (const match of content.matchAll(TOKEN_USAGE)) {
    usages.push({ token: match[1], file: relative, line: lineNumber(content, match.index ?? 0) });
  }

  if (path.extname(file) === '.css') {
    for (const pattern of broadSelectorPatterns) {
      for (const match of content.matchAll(pattern)) {
        const selector = match[0].replace(/\s+/g, ' ').trim();
        const lineStart = content.lastIndexOf('\n', match.index ?? 0) + 1;
        const preceding = content.slice(Math.max(0, lineStart - 180), lineStart);
        if (!selector.includes('>') && !preceding.includes('audit-allow-broad-selector')) {
          selectorWarnings.push({ selector, file: relative, line: lineNumber(content, match.index ?? 0) });
        }
      }
    }
  }
}

const undefinedUsages = usages.filter(({ token }) => !definitions.has(token) && !isRuntimeToken(token));
const groupedUndefined = new Map();
for (const usage of undefinedUsages) {
  const list = groupedUndefined.get(usage.token) ?? [];
  list.push(usage);
  groupedUndefined.set(usage.token, list);
}

if (groupedUndefined.size > 0) {
  console.error('\nUndefined CSS custom properties:\n');
  for (const [token, locations] of [...groupedUndefined.entries()].sort()) {
    console.error(`  ${token}`);
    for (const location of locations.slice(0, 8)) console.error(`    ${location.file}:${location.line}`);
    if (locations.length > 8) console.error(`    …and ${locations.length - 8} more`);
  }
}

if (selectorWarnings.length > 0) {
  console.warn('\nPotentially broad component selectors:\n');
  for (const warning of selectorWarnings) {
    console.warn(`  ${warning.file}:${warning.line}  ${warning.selector}`);
  }
  console.warn('\nUse a component class, a direct-child selector, or add an audit-allow-broad-selector comment when intentional.');
}

console.log(`\nAudited ${files.length} source files, ${definitions.size} token definitions, and ${usages.length} token usages.`);

if (groupedUndefined.size > 0) process.exitCode = 1;
