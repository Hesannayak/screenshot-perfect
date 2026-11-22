import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight, BookOpen, Check, Cpu, Eye, EyeOff, FileCode2, Fingerprint, KeyRound, Layers,
  Lock, Network, ShieldCheck, Sparkles, Users, Wallet, ArrowDownToLine, Menu, X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo, Reveal, SectionHead } from "@/components/landing/primitives";
import { HeroSculpture } from "@/components/landing/hero-sculpture";
import { PaymentJourney, PaymentDemo } from "@/components/landing/payment-journey";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ringfence — Private payments, settled on-chain" },
      { name: "description", content: "Shielded transfers for EVM chains with compliance built in. Launching on Robinhood Chain testnet." },
      { property: "og:title", content: "Ringfence — Private payments, settled on-chain" },
      { property: "og:description", content: "Hide asset, amount, sender and recipient. Self-custodial, open-source, compliance-native." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const card = "rounded-lg border border-border bg-card transition-colors hover:bg-secondary";

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [["Product", "#product"], ["Developers", "#developers"], ["Compliance", "#compliance"], ["Docs", "#developers"], ["FAQ", "#faq"]] as const;
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label="Ringfence home"><Logo /></a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {links.map(([l, h]) => <a key={l} href={h} className="transition-colors hover:text-foreground">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex"><a href="#waitlist">Join waitlist</a></Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
          {links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="py-2 text-muted-foreground">{l}</a>)}
          <Button asChild className="mt-2"><a href="#waitlist" onClick={() => setOpen(false)}>Join waitlist</a></Button>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <HeroSculpture />
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-5 pb-16 pt-14 sm:min-h-[660px] lg:min-h-[760px]">
        <div className="relative">
          <div className="hero-veil absolute -inset-x-8 -inset-y-12 -z-10 lg:hidden" />
          <Reveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" /> Launching on Robinhood Chain testnet
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05]">Ringfence</h1>
            <p className="mt-3 text-[28px] font-medium leading-[34px] sm:text-5xl sm:leading-[49px]">
              Private payments,<br /><span className="text-primary">settled on-chain.</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-6 text-muted-foreground lg:mx-0">
              Shielded transfers for EVM. Hide the asset and amount — and optionally the sender and recipient — in a single on-chain transaction, with compliance built in from the start.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild><a href="#waitlist">Join the waitlist <ArrowRight /></a></Button>
              <Button asChild variant="secondary"><a href="#developers"><BookOpen /> Read the docs</a></Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [[Cpu, "Groth16 proofs in ~tens of ms"], [Wallet, "Self-custodial"], [FileCode2, "Open-source core"], [ShieldCheck, "Compliance-native"]] as const;
  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 md:grid-cols-4">
        {items.map(([I, t]) => (
          <div key={t} className="flex items-center gap-3 text-sm"><I className="size-4 shrink-0 text-primary" /><span>{t}</span></div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs text-primary">The problem</p>
          <h2 className="mt-3 text-[28px] font-semibold leading-[34px]">On-chain privacy has been a false choice.</h2>
          <p className="mt-4 text-muted-foreground">Every EVM transfer is public: balances, counterparties, payroll, treasury moves. The tools that existed to fix this were either unaccountable mixers that regulators sanctioned, or nothing at all.</p>
        </Reveal>
        <div className="grid gap-4">
          {[
            ["Transparent by default", "Anyone can trace salaries, vendor payments and treasury positions from a single address."],
            ["Mixers without accountability", "Privacy with no policy layer invites abuse, and gets shut down."],
            ["Ringfence: privacy with policy", "Shielded transfers where compliance rules are proven on-chain before any private transfer settles."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className={`border-t py-5 ${i === 2 ? "border-primary/50" : "border-border"}`}>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[28px] font-semibold leading-[34px]">Privacy, end to end.</h2>
          <p className="font-mono text-xs text-primary">Under the hood / Architecture</p>
        </div>
        <div className="mt-6 grid items-center gap-4 md:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
          <Box title="User wallet" sub="+ Ringfence SDK" icon={Wallet} />
          <Arrow />
          <div className="grid gap-2">
            <Box title="Prover" sub="local or GPU" icon={Cpu} small />
            <Box title="Relayer" sub="sanctions screening" icon={Network} small />
            <Box title="Indexer" sub="encrypted note sync" icon={Layers} small />
          </div>
          <Arrow />
          <div className="grid gap-2">
            <Box title="Policy module" sub="verified first" icon={ShieldCheck} small />
            <Box title="Shielded pool" sub="Groth16 verifier" icon={Lock} small />
            <p className="text-center font-mono text-xs text-primary">on-chain</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function Box({ title, sub, icon: I, small }: { title: string; sub: string; icon: typeof Wallet; small?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border border-border bg-card ${small ? "p-3" : "p-4"}`}>
      <I className="size-4 shrink-0 text-primary" />
      <div className="min-w-0"><p className="text-sm font-medium">{title}</p><p className="font-mono text-xs text-muted-foreground">{sub}</p></div>
    </div>
  );
}
function Arrow() {
  return <ArrowRight className="mx-auto size-5 rotate-90 text-muted-foreground md:rotate-0" />;
}

function Features() {
  const f = [
    [EyeOff, "Confidential transfers", "Asset type and amount stay private. Observers see only that a valid transfer happened."],
    [Users, "Anonymous transfers", "Route through relayers to hide sender and recipient as well."],
    [Lock, "Encrypted on-chain balances", "Balances live on-chain as encrypted notes. No off-chain custodian."],
    [Sparkles, "Custom Rings", "Per-pool compliance policy: limits, allowlists, auditors and association sets."],
    [KeyRound, "Auditor visibility", "Scoped, provable disclosure through viewing keys, under the user's control."],
    [Fingerprint, "Association sets", "Prove your funds come from a clean set without revealing which deposit."],
    [Cpu, "GPU + local proving", "Prove on-device in tens of milliseconds, or offload to GPU provers."],
    [FileCode2, "TypeScript + Rust SDKs", "Typed clients for web apps, wallets and backend services."],
  ] as const;
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHead eyebrow="Features" title="Everything a private balance needs." />
      <div className="mt-8 grid gap-x-12 sm:grid-cols-2">
        {f.map(([I, t, d], i) => (
          <Reveal key={t} delay={(i % 2) * 0.06} className="flex gap-4 border-t border-border py-6">
            <I className="mt-0.5 size-5 shrink-0 text-primary" />
            <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Tiers() {
  const tiers = [
    ["Embedded Private Wallet", "Add a private balance to your app in one drop-in.", ["Hosted key infrastructure", "Client SDK + UI hooks", "Relayer access"], "Get access"],
    ["Private Wallet", "A private balance for any existing wallet.", ["MetaMask Snap", "Extension module", "Local proving"], "Get access"],
    ["Private On/Off-Ramp", "Fiat in and out, privately.", ["Server SDK", "For CEXs, PSPs, card programs", "Screening hooks"], "Contact us"],
    ["Custom Ring", "Configurable compliance for regulated institutions.", ["Auditor keys", "Association sets + policy", "Dedicated support"], "Contact us"],
  ] as const;
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHead eyebrow="Products" title="Pick your integration." sub="From a drop-in wallet balance to a fully configured enterprise ring." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map(([t, d, list, cta], i) => (
          <Reveal key={t} delay={i * 0.06} className={`${card} flex flex-col p-6 ${i === 3 ? "border-primary/40 bg-primary/5" : ""}`}>
            {i === 3 && <span className="mb-3 w-fit rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">Enterprise</span>}
            <h3 className="text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <ul className="mt-6 grid gap-2 text-sm">
              {list.map((l) => <li key={l} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{l}</li>)}
            </ul>
            <ContactButton label={cta} product={t} primary={i === 3} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function ContactButton({ label, product, primary }: { label: string; product: string; primary?: boolean }) {
  return (
    <Button className="mt-7 w-full" variant={primary ? "default" : "outline"}
      onClick={() => toast.success(`Thanks — we'll reach out about ${product}.`)}>
      {label}
    </Button>
  );
}

function Developers() {
  const code: [string, string][] = [
    ["c", "import { createRingfenceClient } from \"@ringfence/sdk\";"],
    ["c", "const rf = createRingfenceClient({ chain: robinhoodTestnet, wallet });"],
    ["", ""],
    ["k", "// 1. Shield"],
    ["c", "await rf.deposit({ token: USDC, amount: 1_000n * 10n ** 6n });"],
    ["k", "// 2. Private transfer"],
    ["c", "await rf.transfer({ to: \"rf1q9x…7kd\", token: USDC, amount: 250n * 10n ** 6n });"],
    ["k", "// 3. Read encrypted balance"],
    ["c", "const balance = await rf.getBalance({ token: USDC });"],
    ["k", "// 4. Withdraw"],
    ["c", "await rf.withdraw({ to: \"0x8f3a…c21e\", token: USDC, amount: 100n * 10n ** 6n });"],
    ["k", "// 5. History"],
    ["c", "const history = await rf.getHistory();"],
  ];
  return (
    <section id="developers" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="font-mono text-xs text-primary">Developers</p>
          <h2 className="mt-3 text-[28px] font-semibold leading-[34px]">Five calls to private balances.</h2>
          <p className="mt-4 text-muted-foreground">A viem-style client that handles note management, proving and relaying. Deposit, transfer, read balance, withdraw, read history — that's the whole surface.</p>
          <Button asChild variant="outline" className="mt-8"><a href="#developers"><BookOpen /> Read the docs</a></Button>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-muted" /><span className="size-2.5 rounded-full bg-muted" /><span className="size-2.5 rounded-full bg-muted" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">private-balance.ts</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6"><code>
            {code.map(([k, l], i) => <div key={i} className={k === "k" ? "text-muted-foreground" : "text-foreground"}>{l || " "}</div>)}
          </code></pre>
        </Reveal>
      </div>
    </section>
  );
}

function Compliance() {
  const items = [
    ["Self-custodial", "Only you hold the keys to your notes."],
    ["Non-upgradeable, open-source contracts", "The core can't be swapped out from under you."],
    ["No admin freeze key", "No one, including us, can freeze or seize funds in the pool."],
    ["Auditor visibility", "Scoped viewing keys for provable, user-controlled disclosure."],
    ["Association-set screening", "Prove membership in a clean set of deposits."],
    ["Relayer sanctions screening", "Relayers screen against sanctions lists at the edge."],
  ];
  return (
    <section id="compliance" className="scroll-mt-20 border-y border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead eyebrow="Compliance & security" title="Built to be trusted, not just private." sub="A policy proof is verified before the privacy proof. Non-compliant transfers are rejected on-chain." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.06} className={`${card} p-6`}>
              <ShieldCheck className="size-5 text-primary" />
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Status: </span>
          Independent security audits and a public trusted-setup ceremony are underway. Ringfence will not launch on mainnet until both are complete.
        </Reveal>
      </div>
    </section>
  );
}

function Chains() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHead eyebrow="Chains" title="Launching on Robinhood Chain, expanding across EVM." />
      <div className="mt-8 grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
        <Reveal className={`${card} border-primary/40 p-6`}>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs text-primary">Testnet · first</span>
          <h3 className="mt-4 text-xl font-semibold">Robinhood Chain</h3>
          <p className="mt-1 text-sm text-muted-foreground">Arbitrum Orbit L2. Our launch network.</p>
        </Reveal>
        {[["BNB Smart Chain", "Next"], ["Other EVM L2s", "Later"]].map(([t, s], i) => (
          <Reveal key={t} delay={(i + 1) * 0.06} className={`${card} p-6 opacity-80`}>
            <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">Coming soon · {s}</span>
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const qs: [string, string][] = [
    ["Is it self-custodial?", "Yes. Your notes are encrypted to your keys. Ringfence never holds your funds and cannot move them."],
    ["Can funds be frozen?", "No. The core contracts are non-upgradeable and have no admin key that can freeze or seize funds."],
    ["How is this different from Tornado Cash?", "Compliance is native. Custom Rings enforce policy — auditor visibility, association sets, limits, allowlists — and the policy proof is verified on-chain before the privacy proof. Relayers also screen against sanctions lists. It also supports private transfers within the pool, not just deposit and withdraw."],
    ["How does compliance work?", "Each ring defines a policy. Transfers must prove they satisfy it, for example that funds come from an approved association set. Users can grant scoped viewing keys to auditors for provable disclosure."],
    ["Which chains?", "Robinhood Chain first, then BNB Smart Chain, then other EVM L2s."],
    ["When does it launch?", "We're on Robinhood Chain testnet with a private beta now. Mainnet follows completed audits and the trusted-setup ceremony. Join the waitlist for updates."],
    ["Is it audited yet?", "Not yet. Independent audits are in progress. Treat the current release as pre-release testnet software."],
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16">
      <SectionHead eyebrow="FAQ" title="Questions, answered plainly." />
      <Reveal className="mt-12">
        <Accordion type="single" collapsible>
          {qs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget as HTMLFormElement).get("email") ?? "").trim();
    setEmail(value);
    if (!/^\S+@\S+\.\S+$/.test(value)) { toast.error("Enter a valid email address."); return; }
    setDone(true);
    toast.success("You're on the list.");
  };
  return (
    <section id="waitlist" className="scroll-mt-20 border-t border-border bg-card/30 px-5 py-16">
      <Reveal className="mx-auto max-w-6xl text-center">
        <div className="relative">
          <h2 className="text-[28px] font-semibold leading-[34px]">Join the waitlist.</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Get testnet access and launch updates. No spam.</p>
          {done ? (
            <p className="mt-8 inline-flex items-center gap-2 text-primary"><Check className="size-5" /> Thanks — we'll be in touch at {email}.</p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">Email</label>
              <Input id="email" name="email" type="email" required placeholder="you@company.com" className="h-11 bg-background/70" />
              <Button type="submit" size="lg" className="h-11">Join waitlist</Button>
            </form>
          )}
          <Button variant="ghost" onClick={() => toast.success("Thanks — our team will contact you about Custom Rings.")}
            className="mt-6 text-sm text-muted-foreground">
            Talk to us about Custom Rings <ArrowDownToLine className="size-4 -rotate-90" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Product", ["Embedded Wallet", "Private Wallet", "On/Off-Ramp", "Custom Rings"]],
    ["Developers", ["Docs", "TypeScript SDK", "Rust SDK", "GitHub"]],
    ["Company", ["About", "Careers", "Security", "Contact"]],
    ["Social", ["X / Twitter", "Discord", "Farcaster", "Blog"]],
  ] as const;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div><Logo /><p className="mt-3 max-w-xs text-sm text-muted-foreground">Private payments on EVM, with compliance built in.</p></div>
        {cols.map(([h, ls]) => (
          <div key={h}>
            <p className="text-sm font-medium">{h}</p>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">{ls.map((l) => <li key={l}><a href="#top" className="hover:text-foreground">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl border-t border-border px-5 py-6 text-xs text-muted-foreground">
        © 2026 Ringfence. Pre-release software running on testnet. Not audited. Do not use with funds you cannot afford to lose.
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero /><TrustBar /><Problem /><PaymentJourney /><PaymentDemo /><HowItWorks /><Features /><Tiers /><Developers /><Compliance /><Chains /><FAQ /><CTA />
      </main>
      <Footer />
    </div>
  );
}
