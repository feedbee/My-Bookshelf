import { readFileSync } from 'node:fs';

const [command, tag] = process.argv.slice(2);
const match = /^v((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*))$/.exec(tag ?? '');
if (!match || !['check', 'verify', 'notes'].includes(command)) {
  throw new Error('Usage: node scripts/release.mjs <check|verify|notes> vMAJOR.MINOR.PATCH');
}

const [, version] = match;
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const manifest = JSON.parse(read('../core/package.json'));
const lock = JSON.parse(read('../core/package-lock.json'));
if (manifest.version !== version || lock.version !== version || lock.packages?.['']?.version !== version) {
  throw new Error('Release tag, package.json and package-lock.json versions must agree');
}

const changelog = read('../CHANGELOG.md');
const sections = changelog.split(/^## /m).slice(1);
const matchingSections = sections.filter((section) => section.startsWith(`[${version}] - `));
const section = matchingSections[0]?.trim();
const heading = section?.split('\n')[0];
if (matchingSections.length !== 1 || !section.includes('\n') ||
    !/^\[.+\] - (?:\d{4}-\d{2}-\d{2}|Unreleased)$/.test(heading)) {
  throw new Error(`Expected one populated changelog section for ${version}`);
}

if (command === 'verify' && heading.endsWith(' - Unreleased')) {
  throw new Error(`Set the release date for ${version} in CHANGELOG.md before tagging`);
}

process.stdout.write(command === 'notes' ? `## ${section}\n` : `${version}\n`);
