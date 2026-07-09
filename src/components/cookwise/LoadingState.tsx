import { useEffect, useState } from "react";

const MESSAGES = [
  "Warming up the stove...",
  "Getting your measurements exact...",
  "Chopping the ingredients...",
  "Balancing the flavors...",
  "Plating it up...",
];

export function LoadingState() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-warm">
      <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
        {[0, 1, 2].map((n) => (
          <path
            key={n}
            d={`M ${20 + n * 20} 60 C ${14 + n * 20} 46, ${28 + n * 20} 40, ${20 + n * 20} 26 S ${28 + n * 20} 12, ${22 + n * 20} 4`}
            stroke="oklch(0.665 0.145 46)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          >
            <animate
              attributeName="opacity"
              values="0.25;0.9;0.25"
              dur={`${1.6 + n * 0.4}s`}
              repeatCount="indefinite"
              begin={`${n * 0.25}s`}
            />
          </path>
        ))}
      </svg>
      <p key={i} className="mt-6 animate-in fade-in font-serif text-xl text-foreground">
        {MESSAGES[i]}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">This usually takes a few seconds.</p>
    </div>
  );
}