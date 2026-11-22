import { ClientOnly } from "@tanstack/react-router";
import { Component, lazy, Suspense, type ReactNode } from "react";
import { RingVisual } from "./primitives";

const RingScene = lazy(() => import("./ring-scene"));

function Fallback() {
  return <div className="mx-auto h-full max-w-xs"><RingVisual /></div>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() { return this.state.failed ? <Fallback /> : this.props.children; }
}

export function HeroSculpture() {
  return (
    <div className="relative -mx-5 mt-2 h-[260px] sm:h-[340px]">
      <ClientOnly fallback={<Fallback />}>
        <SceneBoundary><Suspense fallback={<Fallback />}><RingScene /></Suspense></SceneBoundary>
      </ClientOnly>
    </div>
  );
}