// Driver for the site-generator-speed-01 entry (node22).
// Reads every case from <input>/cases.json, answers each one with run() from
// ./solve.js, and writes <output>/answers.json, one answer per case, in
// order. The harness runs `node main.ts`; outside a container
// MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for /input and /output.
// The run is deterministic: the same input always writes the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// Keep V8's incremental marking off for the whole run, set before solve.js
// is imported so its work runs under the same flags as the house baseline.
setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

type Case = { id: string; input: unknown };

function readCases(): Case[] {
  return JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as Case[];
}

function answerAll(cases: Case[]): unknown[] {
  const answers: unknown[] = new Array(cases.length);
  for (let i = 0; i < cases.length; i++) answers[i] = run(cases[i].input);
  return answers;
}

const cases = readCases();
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answerAll(cases)));
