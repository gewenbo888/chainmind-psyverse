# ChainMind · 链脑

> Where does the safety actually come from?
> 安全，到底从哪里来？

A cognitive system for blockchain security, architecture, and trust analysis.
Five chambers, one question: which assumptions does each system require you
to trust, and which ones does math protect for you?

## Links

- **Live:** [chainmind.psyverse.fun](https://chainmind.psyverse.fun)
- **Vercel:** [chainmind-psyverse.vercel.app](https://chainmind-psyverse.vercel.app)
- **GitHub:** [github.com/gewenbo888/chainmind-psyverse](https://github.com/gewenbo888/chainmind-psyverse)

## Modules

- `/architectures` — 5 archetype stack diagrams (monolithic, modular, optimistic, ZK, Psy) with per-layer trust labels.
- `/trust` — 9-system × 6-dimension trust matrix with hover details.
- `/risks` — failure-mode taxonomy + ~25 catalogued historical incidents (sortable by category, chronological).
- `/simulate` — animated cross-chain flow simulator. Pick flow × architecture, watch step-by-step with trust-assumption callouts.
- `/psy` — Psy Protocol deep dive. Plonky2 → Groth16 → L1 verifier. Three precise claims, honest framing of what is and isn't solved.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS, Outfit + Inter + JetBrains Mono
- All hand-curated content; SVG diagrams; static, no backend
- Bilingual EN / 中文 with localStorage persistence

## About

Part of the [Psyverse](https://psyverse.fun) portfolio by [Gewenbo](https://psyverse.fun).
