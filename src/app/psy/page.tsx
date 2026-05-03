"use client";

import { useM } from "@/lib/providers";

export default function PsyPage() {
  const { tr, lang } = useM();
  return (
    <main className="container-cm py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow-psy mb-3">{tr("psyEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("psyTitle")}</h1>
        <p className="lede max-w-3xl">{tr("psySubtitle")}</p>
      </header>

      {/* Verification path */}
      <section className="mb-24">
        <div className="eyebrow-psy mb-3">{tr("psyArchTitle")}</div>
        <h2 className="display-2 mb-12 max-w-2xl">
          {lang === "en"
            ? "From a single transaction to an L1 verification — in four steps."
            : "从一笔交易到 L1 上的验证——四步。"}
        </h2>

        <div className="space-y-px bg-smoke/40">
          <PsyStep n="1" titleK="psyStep1Title" bodyK="psyStep1Body" />
          <PsyStep n="2" titleK="psyStep2Title" bodyK="psyStep2Body" />
          <PsyStep n="3" titleK="psyStep3Title" bodyK="psyStep3Body" />
          <PsyStep n="4" titleK="psyStep4Title" bodyK="psyStep4Body" />
        </div>

        {/* Diagram */}
        <div className="mt-10 card !p-8">
          <Pipeline />
        </div>
      </section>

      {/* Three claims */}
      <section className="mb-24">
        <div className="eyebrow-psy mb-3">{lang === "en" ? "What is actually being claimed" : "Psy 究竟在主张什么"}</div>
        <h2 className="display-2 mb-12 max-w-2xl">
          {lang === "en"
            ? "Three precise claims. Each one is checkable."
            : "三条精确的主张。每一条都可被检验。"}
        </h2>
        <div className="grid gap-px bg-smoke/40">
          <PsyClaim n="01" titleK="psyClaim1Title" bodyK="psyClaim1Body" />
          <PsyClaim n="02" titleK="psyClaim2Title" bodyK="psyClaim2Body" />
          <PsyClaim n="03" titleK="psyClaim3Title" bodyK="psyClaim3Body" />
        </div>
      </section>

      {/* Honest limits */}
      <section className="mb-12">
        <div className="card border-warning/40">
          <div className="eyebrow text-warning mb-3">⚠ {tr("psyHonest")}</div>
          <p className="prose-body">{tr("psyHonestBody")}</p>
        </div>
      </section>

      {/* Numbers */}
      <section className="grid gap-px bg-smoke/40 md:grid-cols-3">
        <div className="bg-ink p-8">
          <div className="eyebrow mb-2">verification cost</div>
          <div className="stat-num text-3xl text-psy">~285k gas</div>
          <p className="mt-2 text-sm text-bone">
            {lang === "en"
              ? "Comparable to one Uniswap swap. The L1 verifier accepts a Groth16 proof of an entire Psy checkpoint."
              : "约等于一次 Uniswap 兑换。L1 验证器接受的是整个 Psy checkpoint 的 Groth16 证明。"}
          </p>
        </div>
        <div className="bg-ink p-8">
          <div className="eyebrow mb-2">force-withdraw timeout</div>
          <div className="stat-num text-3xl text-psy">2 hours</div>
          <p className="mt-2 text-sm text-bone">
            {lang === "en"
              ? "If relayers stop pushing proofs, any user can self-generate a withdrawal proof and submit directly to L1."
              : "若中继者停止推送证明，任何用户都可自行生成提款证明并直接提交到 L1。"}
          </p>
        </div>
        <div className="bg-ink p-8">
          <div className="eyebrow mb-2">trust set size</div>
          <div className="stat-num text-3xl text-psy">≈ 0</div>
          <p className="mt-2 text-sm text-bone">
            {lang === "en"
              ? "Safety property holds even if every Psy operator is malicious. Liveness degrades; safety does not."
              : "即便所有 Psy 运营者皆恶意，安全属性仍然成立。活性会下降；安全性不会。"}
          </p>
        </div>
      </section>
    </main>
  );
}

function PsyStep({ n, titleK, bodyK }: { n: string; titleK: any; bodyK: any }) {
  const { tr } = useM();
  return (
    <article className="bg-ink p-8 md:p-10">
      <div className="grid gap-6 md:grid-cols-[80px_1fr]">
        <div className="font-mono text-3xl text-psy">{n}</div>
        <div>
          <h3 className="display-3 mb-3">{tr(titleK)}</h3>
          <p className="prose-body max-w-2xl">{tr(bodyK)}</p>
        </div>
      </div>
    </article>
  );
}

function PsyClaim({ n, titleK, bodyK }: { n: string; titleK: any; bodyK: any }) {
  const { tr } = useM();
  return (
    <article className="bg-ink p-8 md:p-10">
      <div className="grid gap-6 md:grid-cols-[80px_1fr]">
        <div className="font-mono text-2xl text-psy">{n}</div>
        <div>
          <h3 className="display-3 mb-3 text-psy">{tr(titleK)}</h3>
          <p className="prose-body max-w-3xl">{tr(bodyK)}</p>
        </div>
      </div>
    </article>
  );
}

function Pipeline() {
  const W = 800, H = 200;
  const stages = [
    { x: 80, label: "Tx", sub: "Plonky2 proof" },
    { x: 230, label: "Realm", sub: "checkpoint proof" },
    { x: 380, label: "Coord", sub: "aggregated" },
    { x: 540, label: "Groth16", sub: "wrap on BN254" },
    { x: 700, label: "L1", sub: "Solidity verifier" },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full">
      <line x1={60} y1={H / 2} x2={W - 40} y2={H / 2} stroke="#252938" strokeWidth="1" strokeDasharray="2 4" />
      {stages.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={H / 2} r={26} fill="#10121C" stroke="#A78BFA" strokeWidth="1.5" />
          <text x={s.x} y={H / 2 + 5} fontSize="11" fill="#A78BFA" textAnchor="middle" fontFamily="ui-monospace" fontWeight="500">
            {s.label}
          </text>
          <text x={s.x} y={H / 2 + 50} fontSize="10" fill="#A4A8BA" textAnchor="middle" fontFamily="ui-monospace">
            {s.sub}
          </text>
          {i > 0 && (
            <path
              d={`M ${stages[i - 1].x + 26} ${H / 2} L ${s.x - 26} ${H / 2}`}
              fill="none"
              stroke="#A78BFA"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
            />
          )}
        </g>
      ))}
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 z" fill="#A78BFA" />
        </marker>
      </defs>
    </svg>
  );
}
