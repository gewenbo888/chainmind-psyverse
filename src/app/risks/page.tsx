"use client";

import { useState } from "react";
import { useM } from "@/lib/providers";
import { INCIDENTS, CATEGORY_INFO, type Category } from "@/data/incidents";

export default function RisksPage() {
  const { tr, lang } = useM();
  const [filter, setFilter] = useState<Category | null>(null);

  const totalLost = INCIDENTS.reduce((s, i) => s + i.lossM, 0);

  // Group by category
  const byCategory = (Object.keys(CATEGORY_INFO) as Category[]).map((cat) => ({
    cat,
    info: CATEGORY_INFO[cat],
    items: INCIDENTS.filter((i) => i.category === cat).sort((a, b) => b.lossM - a.lossM),
    total: INCIDENTS.filter((i) => i.category === cat).reduce((s, i) => s + i.lossM, 0),
  }));

  // Chronological order
  const sorted = [...INCIDENTS].sort((a, b) => a.date.localeCompare(b.date));
  const filtered = filter ? sorted.filter((i) => i.category === filter) : sorted;

  return (
    <main className="container-cm py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow-breach mb-3">{tr("risksEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("risksTitle")}</h1>
        <p className="lede max-w-2xl">{tr("risksSubtitle")}</p>
      </header>

      {/* Total */}
      <div className="card mb-12 border-breach/30">
        <div className="eyebrow-breach mb-2">{tr("risksTotalLost")}</div>
        <div className="stat-num text-5xl text-breach md:text-6xl">${(totalLost / 1000).toFixed(2)}B</div>
        <div className="mt-1 font-mono text-xs text-bone">
          {INCIDENTS.length} {lang === "en" ? "events catalogued" : "起事件已归档"}
        </div>
      </div>

      {/* By category */}
      <section className="mb-16">
        <div className="eyebrow mb-6">{tr("risksByCategory")}</div>
        <div className="space-y-3">
          {byCategory
            .sort((a, b) => b.total - a.total)
            .map(({ cat, info, items, total }) => (
              <button
                key={cat}
                onClick={() => setFilter(filter === cat ? null : cat)}
                className={`w-full rounded border border-smoke/60 bg-graphite/40 p-5 text-left transition-colors hover:border-blueprint/40 ${
                  filter === cat ? "border-blueprint" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="inline-block h-3 w-3 rounded-sm" style={{ background: info.color }} />
                    <span className="font-mono text-sm uppercase tracking-[0.12em] text-paper">
                      {lang === "zh" ? info.zh : info.en}
                    </span>
                    <span className="font-mono text-[10px] text-bone">{items.length}</span>
                  </div>
                  <span className="stat-num text-2xl text-breach">${total.toLocaleString()}M</span>
                </div>
                {/* Bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-sm bg-smoke">
                  <div
                    className="h-full"
                    style={{
                      width: `${(total / Math.max(...byCategory.map((c) => c.total))) * 100}%`,
                      background: info.color,
                    }}
                  />
                </div>
              </button>
            ))}
        </div>
        {filter && (
          <button
            onClick={() => setFilter(null)}
            className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-bone hover:text-paper"
          >
            ✕ {lang === "en" ? "clear filter" : "清除筛选"}
          </button>
        )}
      </section>

      {/* Chronological */}
      <section>
        <div className="eyebrow mb-6">{tr("risksTimeline")}</div>
        <div className="space-y-px bg-smoke/40">
          {filtered.map((i) => (
            <article key={i.id} className="bg-ink p-5">
              <div className="grid items-baseline gap-3 md:grid-cols-[110px_1fr_auto]">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone">{i.date}</div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-sm"
                      style={{ background: CATEGORY_INFO[i.category].color }}
                    />
                    <h3 className="display-3 text-paper">{lang === "zh" ? i.zh : i.en}</h3>
                  </div>
                  <div className="mt-1 text-sm text-bone">
                    {lang === "zh" ? i.archetypeZh : i.archetypeEn} · {lang === "zh" ? CATEGORY_INFO[i.category].zh : CATEGORY_INFO[i.category].en}
                  </div>
                </div>
                <div className="stat-num text-2xl text-breach">${i.lossM.toLocaleString()}M</div>
              </div>
              <p className="prose-body mt-3 text-sm">{lang === "zh" ? i.causeZh : i.causeEn}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
