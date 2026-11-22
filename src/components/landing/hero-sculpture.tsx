import { ClientOnly } from "@tanstack/react-router";
import { Component, lazy, Suspense, type ReactNode, type RefObject } from "react";
import { RingVisual } from "./primitives";

const RingScene = lazy(() => import("./ring-scene"));

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[520px] max-w-[70vw] opacity-50"><RingVisual /></div>
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() { return this.state.failed ? <Fallback /> : this.props.children; }
}

/**
 * Decorative background stage: one oversized, right-anchored sculpture that
 * spills past the section edge, with token-derived fades so copy stays legible.
 */
export function HeroSculpture({ progress }: { progress?: RefObject<number> }) {
  if (progress) return (
    <div className="h-full w-full" aria-hidden>
      <ClientOnly fallback={<Fallback />}>
        <SceneBoundary><Suspense fallback={<Fallback />}><RingScene progress={progress} /></Suspense></SceneBoundary>
      </ClientOnly>
    </div>
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="hero-halo absolute left-auto right-[-26%] top-[66%] h-[92vw] max-h-[560px] w-[92vw] max-w-[560px] -translate-y-1/2 opacity-45 blur-3xl lg:left-auto lg:right-[-2%] lg:top-1/2 lg:h-[88vh] lg:max-h-[820px] lg:w-[88vh] lg:max-w-[820px] lg:translate-x-0 lg:opacity-50" />
      <div className="absolute left-auto right-[-30%] top-[66%] h-[125vw] max-h-[640px] w-[125vw] max-w-[640px] -translate-y-1/2 opacity-80 sm:opacity-85 lg:right-[-22%] lg:top-1/2 lg:h-[118vh] lg:max-h-[1160px] lg:w-[118vh] lg:max-w-[1160px] lg:translate-x-0 lg:opacity-95">
        <div className="pointer-events-auto h-full w-full">
          <ClientOnly fallback={<Fallback />}>
            <SceneBoundary>
              <Suspense fallback={<Fallback />}><RingScene /></Suspense>
            </SceneBoundary>
          </ClientOnly>
        </div>
      </div>
      <div className="hero-fade absolute inset-0 lg:hidden" />
      <div className="hero-fade-right absolute inset-0 hidden lg:block" />
      <div className="hero-scrim absolute inset-y-0 left-0 w-full lg:w-4/5" />
    </div>
  );
}
