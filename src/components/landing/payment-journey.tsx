import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Eye, EyeOff, Lock, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSculpture } from "./hero-sculpture";
import { journeyChapter, observerPayment, type PaymentMode } from "./payment-illustration";

const chapters = [
  { title: "Value goes in.", accent: "Your keys stay yours.", description: "Shield tokens into an encrypted note. A private balance, without handing custody to anyone else.", label: "Shield", status: "Encrypted note created", icon: Wallet },
  { title: "Details stay private.", accent: "The proof travels.", description: "A zero-knowledge proof verifies the transfer. Asset and amount stay hidden; relayers can also hide the sender and recipient.", label: "Prove", status: "Policy + privacy proofs verified", icon: Lock },
  { title: "Payment settles.", accent: "Privacy stays intact.", description: "Transfer within the pool or withdraw to an address. Share a scoped viewing key only when you choose.", label: "Settle", status: "Valid transfer · private details", icon: ShieldCheck },
] as const;

export function PaymentJourney() {
  const target = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [chapter, setChapter] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce || window.matchMedia("(max-height: 720px)").matches) return;
    progress.current = value;
    setChapter(journeyChapter(value));
  });
  const current = chapters[chapter] ?? chapters[0];
  function selectChapter(index: number) {
    if (reduce || window.matchMedia("(max-height: 720px)").matches) {
      setChapter(index);
      return;
    }
    const element = target.current;
    if (!element) return;
    const stage = element.firstElementChild;
    const travel = element.offsetHeight - (stage?.clientHeight ?? 0);
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + travel * ((index + 0.25) / 3), behavior: "smooth" });
  }

  return (
    <section ref={target} id="product" className="payment-journey relative border-b border-border" aria-label="The private payment journey">
      <div className="journey-stage sticky top-16 overflow-hidden bg-background">
        <div className="mx-auto flex h-full max-w-6xl flex-col px-5 py-7 sm:py-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <p className="font-mono text-xs text-primary">Inside a private payment</p>
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">0{chapter + 1} / 03 <ArrowDown className="size-3" /></span>
          </div>
          <div className="grid min-h-0 flex-1 items-center lg:grid-cols-[1fr_1.15fr]">
            <div className="relative z-10 pt-6 lg:py-12">
              <div className="flex items-center gap-2 text-sm text-primary"><current.icon className="size-4" />{current.label}</div>
              <motion.div key={chapter} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-h-[184px] sm:min-h-[210px]">
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.12] sm:text-5xl">{current.title}<br /><span className="text-primary">{current.accent}</span></h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">{current.description}</p>
              </motion.div>
              <p className="mt-3 hidden items-center gap-2 font-mono text-xs text-muted-foreground lg:flex"><Check className="size-3 text-primary" />{current.status}</p>
            </div>
            <div className="relative -mx-5 h-[240px] sm:h-[340px] lg:mx-0 lg:h-[500px]">
              <HeroSculpture progress={progress} />
              <div className="absolute inset-x-5 bottom-0 flex justify-between font-mono text-[10px] text-muted-foreground sm:text-xs"><span>01 / ENTRY</span><span className="text-primary">RINGFENCE</span><span>02 / SETTLEMENT</span></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-border pt-5">
            {chapters.map((item, index) => <div key={item.label} className={index <= chapter ? "text-primary" : "text-muted-foreground"}>
              <div className="mb-3 h-px bg-border"><div className={`h-px bg-primary transition-[width] duration-500 ${index <= chapter ? "w-full" : "w-0"}`} /></div>
              <Button variant="ghost" className="h-8 w-full justify-start gap-1 px-1 text-xs sm:gap-2 sm:text-sm" aria-pressed={chapter === index} onClick={() => selectChapter(index)}><span className="font-mono opacity-60">0{index + 1}</span>{item.label}</Button>
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PaymentDemo() {
  const [mode, setMode] = useState<PaymentMode>("public");
  const reduce = useReducedMotion();
  const payment = observerPayment(mode);
  const privateMode = mode === "private";
  return (
    <section id="payment-demo" className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs text-primary">Same payment. Different visibility.</p>
            <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] sm:text-[40px]">A payment.<br />Not a public profile.</h2>
            <p className="mt-5 max-w-sm leading-6 text-muted-foreground">Public transfers expose your financial activity. Ringfence separates proof of payment from the details behind it.</p>
            <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-violet" />Illustration only · no live transaction</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-background">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:px-6">
              <p className="font-mono text-xs text-muted-foreground">OBSERVER VIEW</p>
              <div className="flex gap-1" role="group" aria-label="Payment visibility">
                <Button size="sm" variant={privateMode ? "ghost" : "secondary"} aria-pressed={!privateMode} onClick={() => setMode("public")}><Eye />Public</Button>
                <Button size="sm" variant={privateMode ? "default" : "ghost"} aria-pressed={privateMode} onClick={() => setMode("private")}><EyeOff />Private</Button>
              </div>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <div className="relative flex h-12 items-center justify-between gap-3" aria-hidden>
                <Wallet className="size-5 text-muted-foreground" />
                <div className="relative h-px flex-1 bg-border"><motion.span className={`absolute -top-1 size-2 rounded-sm ${privateMode ? "bg-primary" : "bg-violet"}`} initial={false} animate={{ left: privateMode ? "85%" : "10%" }} transition={{ duration: reduce ? 0 : 0.8 }} /></div>
                {privateMode ? <Lock className="size-7 text-primary" /> : <Eye className="size-7 text-violet" />}
                <div className="h-px flex-1 bg-border" /><ArrowRight className="size-5 text-muted-foreground" />
              </div>
              <dl className="mt-4" aria-live="polite" data-payment-mode={mode}>
                {Object.entries(payment).map(([label, value]) => <div key={label} className="flex min-h-12 items-center justify-between gap-3 border-b border-border py-3 last:border-0">
                  <dt className="text-sm capitalize text-muted-foreground">{label}</dt>
                  <dd className={`flex items-center gap-2 font-mono text-sm ${privateMode ? "text-primary" : "text-foreground"}`}>{privateMode && <Lock className="size-3" />}{value}</dd>
                </div>)}
              </dl>
            </div>
            <div className="flex min-h-[76px] items-center gap-3 border-t border-border bg-card/50 px-5 py-4 sm:px-6">
              {privateMode ? <ShieldCheck className="size-5 shrink-0 text-primary" /> : <Eye className="size-5 shrink-0 text-violet" />}
              <p className="text-xs leading-5 text-muted-foreground">{privateMode ? "Private relayer transfer: asset and amount encrypted; sender and recipient shielded. A valid transfer remains visible." : "Public transfer: sender, recipient, asset and amount are visible to anyone."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}