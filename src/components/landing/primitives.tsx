import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-xs text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-[28px] font-semibold leading-[34px]">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-semibold">
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--violet)" />
            <stop offset="1" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <circle cx="13" cy="16" r="7" fill="none" stroke="url(#lg)" strokeWidth="2.5" />
        <circle cx="19" cy="16" r="7" fill="none" stroke="url(#lg)" strokeWidth="2.5" />
      </svg>
      Ringfence
    </span>
  );
}

export function RingVisual() {
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return { x: 200 + Math.cos(a) * 150, y: 200 + Math.sin(a) * 150, k: i };
  });
  const inner = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 + 0.4;
    return { x: 200 + Math.cos(a) * 90, y: 200 + Math.sin(a) * 90, k: i };
  });
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
        <radialGradient id="core">
          <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="120" fill="url(#core)" />
      <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#rg)" strokeOpacity="0.5" strokeDasharray="2 8" />
        {nodes.map((n) => (
          <g key={n.k}>
            <line x1="200" y1="200" x2={n.x} y2={n.y} stroke="url(#rg)" strokeOpacity="0.12" />
            <rect x={n.x - 7} y={n.y - 7} width="14" height="14" rx="4" fill="var(--card)" stroke="url(#rg)" />
          </g>
        ))}
      </g>
      <g className="animate-spin-rev" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="90" fill="none" stroke="url(#rg)" strokeOpacity="0.35" />
        {inner.map((n) => (
          <circle key={n.k} cx={n.x} cy={n.y} r="5" fill="var(--cyan)" fillOpacity="0.8" />
        ))}
      </g>
      <circle cx="180" cy="200" r="38" fill="none" stroke="url(#rg)" strokeWidth="3" />
      <circle cx="220" cy="200" r="38" fill="none" stroke="url(#rg)" strokeWidth="3" />
    </svg>
  );
}
