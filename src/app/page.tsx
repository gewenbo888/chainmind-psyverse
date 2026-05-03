"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useM } from "@/lib/providers";
import { INCIDENTS } from "@/data/incidents";

export default function Home() {
  const { tr, lang } = useM();
  const heroCanvas = useRef<HTMLCanvasElement>(null);

  // decorative animated network
  useEffect(() => {
    const c = heroCanvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; t: "ok" | "broken" };
    let pts: P[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      pts = Array.from({ length: 30 }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        t: Math.random() > 0.85 ? "broken" : "ok",
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const r = c.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const a = (1 - d / 180) * 0.16;
            ctx.strokeStyle = `rgba(92, 155, 255, ${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > r.width) p.vx *= -1;
        if (p.y < 0 || p.y > r.height) p.vy *= -1;
        ctx.fillStyle = p.t === "broken" ? "rgba(239, 68, 68, 0.7)" : "rgba(92, 155, 255, 0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.t === "broken" ? 2 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Stats
  const totalLost = INCIDENTS.reduce((s, i) => s + i.lossM, 0);
  const bridgeLost = INCIDENTS.filter((i) => i.archetypeEn.toLowerCase().includes("bridge")).reduce((s, i) => s + i.lossM, 0);

  return (
    <main>
      <section className="relative overflow-hidden">
        <canvas ref={heroCanvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 40% at 30% 30%, rgba(8,9,15,0) 0%, rgba(8,9,15,0.7) 70%, rgba(8,9,15,1) 100%)" }}
          aria-hidden="true"
        />
        <div className="container-cm relative py-24 md:py-36">
          <div className="max-w-4xl animate-slow-in">
            <div className="eyebrow mb-5">{tr("heroEyebrow")}</div>
            <h1 className="display-1 mb-8">{tr("heroTitle")}</h1>
            <p className="lede max-w-3xl">{tr("heroSubtitle")}</p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/architectures" className="btn-primary">{tr("heroCta")} →</Link>
              <a href="#premise" className="btn-ghost">{tr("heroSecondary")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-smoke/40 py-16">
        <div className="container-cm grid gap-px bg-smoke/40 md:grid-cols-3">
          <div className="bg-ink p-8">
            <div className="eyebrow-breach mb-3">{tr("statLost")}</div>
            <div className="stat-num text-4xl text-breach md:text-5xl">${(bridgeLost / 1000).toFixed(2)}B</div>
          </div>
          <div className="bg-ink p-8">
            <div className="eyebrow mb-3">{tr("statIncidents")}</div>
            <div className="stat-num text-4xl text-paper md:text-5xl">{INCIDENTS.length}</div>
          </div>
          <div className="bg-ink p-8">
            <div className="eyebrow-psy mb-3">{tr("statSystems")}</div>
            <div className="stat-num text-4xl text-psy md:text-5xl">9</div>
          </div>
        </div>
      </section>

      {/* PREMISES */}
      <section id="premise" className="py-24 md:py-32">
        <div className="container-cm">
          <div className="eyebrow mb-3">{tr("premiseEyebrow")}</div>
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-3">
            <Premise n="I" titleK="premise1Title" bodyK="premise1Body" />
            <Premise n="II" titleK="premise2Title" bodyK="premise2Body" />
            <Premise n="III" titleK="premise3Title" bodyK="premise3Body" />
          </div>
        </div>
      </section>

      {/* MODULE INDEX */}
      <section className="border-t border-smoke/40 py-24 md:py-32">
        <div className="container-cm">
          <div className="eyebrow mb-3">{tr("modIndexEyebrow")}</div>
          <h2 className="display-2 mb-12 max-w-3xl">{tr("modIndexTitle")}</h2>

          <div className="grid gap-px bg-smoke/40 md:grid-cols-2">
            <Mod href="/architectures" n="I" titleK="cardArchTitle" descK="cardArchDesc" />
            <Mod href="/trust" n="II" titleK="cardTrustTitle" descK="cardTrustDesc" />
            <Mod href="/risks" n="III" titleK="cardRisksTitle" descK="cardRisksDesc" breach />
            <Mod href="/simulate" n="IV" titleK="cardSimTitle" descK="cardSimDesc" />
            <Mod href="/psy" n="V" titleK="cardPsyTitle" descK="cardPsyDesc" psy span />
          </div>
        </div>
      </section>
    </main>
  );
}

function Premise({ n, titleK, bodyK }: { n: string; titleK: any; bodyK: any }) {
  const { tr } = useM();
  return (
    <div>
      <div className="font-mono text-sm tracking-[0.2em] text-blueprint">{n}</div>
      <h3 className="display-3 mt-4 mb-5">{tr(titleK)}</h3>
      <p className="prose-body">{tr(bodyK)}</p>
    </div>
  );
}

function Mod({
  href,
  n,
  titleK,
  descK,
  breach,
  psy,
  span,
}: {
  href: string;
  n: string;
  titleK: any;
  descK: any;
  breach?: boolean;
  psy?: boolean;
  span?: boolean;
}) {
  const { tr } = useM();
  const labelColor = breach ? "text-breach" : psy ? "text-psy" : "text-blueprint";
  const hoverColor = breach ? "group-hover:text-breach" : psy ? "group-hover:text-psy" : "group-hover:text-blueprint";
  return (
    <Link
      href={href}
      className={`group bg-ink p-10 transition-colors hover:bg-ink2 md:p-12 ${span ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`font-mono text-xs tracking-[0.2em] ${labelColor}`}>{n}</span>
        <span className="font-mono text-xs tracking-[0.18em] text-bone transition-colors group-hover:text-paper">→</span>
      </div>
      <h3 className={`display-2 mt-4 transition-colors ${hoverColor}`}>{tr(titleK)}</h3>
      <p className="prose-body mt-4 max-w-md">{tr(descK)}</p>
    </Link>
  );
}
