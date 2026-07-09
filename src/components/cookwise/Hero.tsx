import { ArrowDown } from "lucide-react";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.15fr_1fr] md:py-24 lg:py-32">
        <div>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary">
            For beginner cooks
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Never guess your way through a recipe again.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            CookWise is your AI cooking assistant, built for beginners. Tell us what you want to cook and get a clear, step-by-step recipe you can actually follow.
          </p>
          <div className="mt-8">
            <button
              onClick={onStart}
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-base font-medium text-primary-foreground shadow-warm transition-all hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
            >
              Start Cooking
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="glow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="oklch(0.94 0.05 60)" />
            <stop offset="100%" stopColor="oklch(0.977 0.008 82)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="220" r="180" fill="url(#glow)" />
        <ellipse cx="200" cy="270" rx="150" ry="30" fill="oklch(0.36 0.04 152)" opacity="0.08" />
        <ellipse cx="200" cy="260" rx="140" ry="26" fill="none" stroke="oklch(0.36 0.04 152)" strokeWidth="2" />
        <ellipse cx="200" cy="256" rx="110" ry="20" fill="none" stroke="oklch(0.36 0.04 152)" strokeWidth="1.25" opacity="0.6" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${150 + i * 50} 200 C ${140 + i * 50} 160, ${180 + i * 50} 150, ${160 + i * 50} 110 S ${180 + i * 50} 60, ${170 + i * 50} 30`}
            stroke="oklch(0.665 0.145 46)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity={0.55 - i * 0.12}
          >
            <animate
              attributeName="opacity"
              values={`${0.5 - i * 0.1};${0.75 - i * 0.1};${0.5 - i * 0.1}`}
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  );
}