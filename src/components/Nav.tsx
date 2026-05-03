"use client";

import Link from "next/link";
import { useM } from "@/lib/providers";

export function Nav() {
  const { tr, lang, setLang } = useM();
  return (
    <header className="sticky top-0 z-30 border-b border-smoke/40 bg-ink/85 backdrop-blur">
      <div className="container-cm flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold tracking-tight">{tr("brand")}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint">⚙</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {[
            { href: "/architectures", k: "navArchitectures" as const },
            { href: "/trust", k: "navTrust" as const },
            { href: "/risks", k: "navRisks" as const },
            { href: "/simulate", k: "navSimulate" as const },
            { href: "/psy", k: "navPsy" as const, psy: true },
          ].map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                it.psy ? "text-psy hover:brightness-125" : "text-bone hover:text-blueprint"
              }`}
            >
              {tr(it.k)}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:text-blueprint"
          aria-label="Toggle language"
        >
          {tr("langToggle")}
        </button>
      </div>
    </header>
  );
}
