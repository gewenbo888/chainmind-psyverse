"use client";

import { useM } from "@/lib/providers";
import { ARCHITECTURES, type Layer } from "@/data/architectures";

const LAYER_ORDER: Layer["key"][] = ["proof", "settlement", "da", "execution", "consensus"];

const LAYER_LABEL_KEY: Record<Layer["key"], any> = {
  consensus: "archConsensus",
  execution: "archExecution",
  da: "archDA",
  settlement: "archSettlement",
  proof: "archProof",
};

export default function ArchitecturesPage() {
  const { tr, lang } = useM();
  return (
    <main className="container-cm py-12 md:py-16">
      <header className="mb-14 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("archEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("archTitle")}</h1>
        <p className="lede max-w-2xl">{tr("archSubtitle")}</p>
      </header>

      <div className="grid gap-px bg-smoke/40 md:grid-cols-2 xl:grid-cols-3">
        {ARCHITECTURES.map((a) => (
          <article key={a.id} className={`bg-ink p-8 ${a.id === "psy" ? "border border-psy/40" : ""}`}>
            <div className="mb-3 flex items-baseline justify-between">
              <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${a.id === "psy" ? "text-psy" : "text-blueprint"}`}>
                {a.id === "psy" ? "Psy" : "Archetype"}
              </span>
              <span className="font-mono text-[10px] text-bone">{a.examples}</span>
            </div>
            <h2 className={`display-3 mb-3 ${a.id === "psy" ? "text-psy" : "text-paper"}`}>
              {lang === "zh" ? a.zh : a.en}
            </h2>
            <p className="prose-body mb-5 text-sm">{lang === "zh" ? a.taglineZh : a.taglineEn}</p>

            {/* Stack diagram */}
            <div className="space-y-px bg-smoke/40">
              {LAYER_ORDER.map((k) => {
                const layer = a.layers.find((l) => l.key === k)!;
                const trustColor =
                  layer.trust === "trustless" ? "border-l-secure"
                  : layer.trust === "minimized" ? "border-l-blueprint"
                  : "border-l-breach";
                return (
                  <div
                    key={k}
                    className={`flex items-center justify-between border-l-2 bg-graphite/40 px-3 py-2 ${trustColor}`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                      {tr(LAYER_LABEL_KEY[k])}
                    </span>
                    <span className="text-right text-xs text-paper">
                      {lang === "zh" ? layer.ownerZh : layer.ownerEn}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 text-sm italic text-bone">{lang === "zh" ? a.noteZh : a.noteEn}</p>
          </article>
        ))}
      </div>

      {/* Legend */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="card">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-3 w-3" style={{ background: "#10B981" }} />
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-secure">trustless</span>
          </div>
          <p className="prose-body text-sm">
            {lang === "en"
              ? "The layer's safety property is enforced by math. No human can override it."
              : "该层的安全属性由数学强制执行。任何人都无法越过它。"}
          </p>
        </div>
        <div className="card">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-3 w-3" style={{ background: "#5C9BFF" }} />
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-blueprint">trust minimized</span>
          </div>
          <p className="prose-body text-sm">
            {lang === "en"
              ? "Distributed trust. Many actors must collude to violate it."
              : "信任分布式。要违反它，需要多方串通。"}
          </p>
        </div>
        <div className="card">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-3 w-3" style={{ background: "#EF4444" }} />
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-breach">trust required</span>
          </div>
          <p className="prose-body text-sm">
            {lang === "en"
              ? "A small set of actors can violate the layer's safety. This is where attacks land."
              : "少数角色就能破坏该层的安全。攻击通常就落在这里。"}
          </p>
        </div>
      </section>
    </main>
  );
}
