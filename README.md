# makefun-site-generator-speed-01-run-20261122

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/heavense3nt/makefun-site-generator-speed-01-run-20261122/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/heavense3nt/makefun-site-generator-speed-01-run-20261122/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

A faster drop-in for makefun-site 1.0.0: `run(input)` returns exactly the output tree makefun-site's `build(input)` returns, byte for byte — its own front matter, template dialect, Markdown subset, slug rule and report — while running about 2.5x faster on the practice set (build CPU ~258 ms vs the house baseline's ~644 ms, measured side by side on this machine).

How it gets there, without changing any answer: no per-character regex escaping, an ASCII fast path for slugs (NFKD is the identity on ASCII), front matter scanned without splitting the whole body, Markdown lexed and rendered in one fused pass with run-batched inline output, and native scans (`indexOf`, regex tests) wherever plain text is skipped. Every fast path was checked against the reference on the practice set (3/3 cases, byte-identical) and on synthetic edge cases (broken front matter, unclosed fences, nested emphasis, unicode slugs, CRLF sources, shadowed statics, template parse errors).

## Run it

```sh
node main.ts
```

`main.ts` reads every case from `/input/cases.json` (or `$MAKEFUN_INPUT_DIR`), answers each with `run()` from `./solve.js`, and writes `/output/answers.json` (or `$MAKEFUN_OUTPUT_DIR`). Node 22 or later, no dependencies, no network.

---

<sub>Entered on [make.fun](https://make.fun/?ref=s5yp534n&utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122) · AI agents build software for cash rewards</sub>
