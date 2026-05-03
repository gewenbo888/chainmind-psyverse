"use client";

import { useState } from "react";
import { useM } from "@/lib/providers";
import { SYSTEMS, type DimKey } from "@/data/trustMatrix";

const DIMS: { k: DimKey; tk: any }[] = [
  { k: "validity", tk: "trustDimValidity" },
  { k: "availability", tk: "trustDimAvailability" },
  { k: "censorship", tk: "trustDimCensorship" },
  { k: "custody", tk: "trustDimCustody" },
  { k: "finality", tk: "trustDimFinality" },
  { k: "exit", tk: "trustDimExit" },
];

export default function TrustPage() {
  const { tr, lang } = useM();
  const [hover, setHover] = useState<{ rowId: string; dim: DimKey } | null>(null);

  return (
    <main className="container-cm py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("trustEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("trustTitle")}</h1>
        <p className="lede max-w-2xl">{tr("trustSubtitle")}</p>
      </header>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-3 text-xs">
        <Legend cls="cell-trustless" k="trustLegendTrustless" />
        <Legend cls="cell-trust-minimized" k="trustLegendMinimized" />
        <Legend cls="cell-trust-required" k="trustLegendRequired" />
        <Legend cls="cell-impossible" k="trustLegendImpossible" />
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-ink p-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-bone"></th>
              {DIMS.map((d) => (
                <th key={d.k} className="border-b border-smoke/60 p-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                  {tr(d.tk)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SYSTEMS.map((s) => (
              <tr key={s.id} className={s.id === "psy" ? "ring-1 ring-psy/30" : ""}>
                <td className={`sticky left-0 bg-ink p-3 font-mono text-sm ${s.id === "psy" ? "text-psy" : "text-paper"}`}>
                  {lang === "zh" ? s.zh : s.en}
                </td>
                {DIMS.map((d) => {
                  const cell = s.cells[d.k];
                  const cls =
                    cell.level === "trustless" ? "cell-trustless"
                    : cell.level === "minimized" ? "cell-trust-minimized"
                    : cell.level === "required" ? "cell-trust-required"
                    : "cell-impossible";
                  const hovered = hover?.rowId === s.id && hover?.dim === d.k;
                  return (
                    <td
                      key={d.k}
                      className={`relative border border-smoke/50 p-3 ${cls} cursor-help`}
                      onMouseEnter={() => setHover({ rowId: s.id, dim: d.k })}
                      onMouseLeave={() => setHover(null)}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                        {cell.level === "trustless" ? "trustless"
                         : cell.level === "minimized" ? "minimized"
                         : cell.level === "required" ? "required"
                         : "n/a"}
                      </span>
                      {hovered && (
                        <div className="absolute left-1/2 top-full z-20 mt-1 w-64 -translate-x-1/2 rounded border border-smoke bg-graphite p-3 text-left shadow-lg">
                          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone mb-1">
                            {lang === "zh" ? s.zh : s.en} · {tr(d.tk)}
                          </div>
                          <div className="text-sm text-paper">{lang === "zh" ? cell.noteZh : cell.noteEn}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reading guide */}
      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <div className="eyebrow mb-3">{lang === "en" ? "Read row by row" : "按行读"}</div>
          <p className="prose-body">
            {lang === "en"
              ? "A row is a system. The mix of colours across that row is its trust profile. A row that is mostly red is a system that asks you to trust people; a row that is mostly green is a system that lets math do the work."
              : "一行就是一个系统。一整行的颜色组合就是它的信任画像。整行多为红色，说明这个系统让你信任人；整行多为绿色，说明这个系统让数学替你完成大部分工作。"}
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">{lang === "en" ? "Read column by column" : "按列读"}</div>
          <p className="prose-body">
            {lang === "en"
              ? "A column is a single trust dimension. Reading down the column shows which systems have solved this dimension and which still demand human honesty for it. Validity is the dimension where ZK changes the most."
              : "一列就是一个信任维度。从上往下读，可以看到哪些系统在这一维度上已解决问题，哪些仍要求人的诚实。Validity（有效性）是 ZK 改变最大的那一维。"}
          </p>
        </div>
      </section>
    </main>
  );
}

function Legend({ cls, k }: { cls: string; k: any }) {
  const { tr } = useM();
  return (
    <span className={`inline-flex items-center gap-2 rounded-sm px-2 py-1 ${cls}`}>
      <span className="inline-block h-2 w-2 rounded-sm bg-current opacity-70" />
      <span className="font-mono text-[10px] uppercase tracking-[0.14em]">{tr(k)}</span>
    </span>
  );
}
