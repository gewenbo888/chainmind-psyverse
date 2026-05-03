"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "@/i18n/dict";
import { t as dict } from "@/i18n/dict";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (k: keyof typeof dict) => string;
}
const C = createContext<Ctx | null>(null);

export function CMProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cm-lang") as Lang | null;
      if (stored === "en" || stored === "zh") setLangState(stored);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try { localStorage.setItem("cm-lang", lang); } catch {}
  }, [lang]);
  return (
    <C.Provider value={{ lang, setLang: setLangState, tr: (k) => dict[k][lang] }}>
      {children}
    </C.Provider>
  );
}

export function useM() {
  const c = useContext(C);
  if (!c) throw new Error("useM must be inside CMProvider");
  return c;
}
