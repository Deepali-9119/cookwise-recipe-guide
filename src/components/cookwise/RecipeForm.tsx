import { useState, type FormEvent } from "react";
import { Minus, Plus, Sparkles } from "lucide-react";
import type { GenerateRecipeInput, TimeBucket } from "@/lib/cookwise-api";

const TIME_OPTIONS: { value: TimeBucket; label: string }[] = [
  { value: "under-15", label: "Under 15 min" },
  { value: "15-30", label: "15–30 min" },
  { value: "30-60", label: "30–60 min" },
  { value: "60-plus", label: "60+ min" },
];

export function RecipeForm({ onSubmit }: { onSubmit: (input: GenerateRecipeInput) => void }) {
  const [query, setQuery] = useState("");
  const [servings, setServings] = useState(2);
  const [timeBucket, setTimeBucket] = useState<TimeBucket>("15-30");

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit({ query: query.trim(), servings, timeBucket });
  };

  return (
    <form
      onSubmit={handle}
      className="mx-auto w-full max-w-[600px] rounded-2xl border border-border bg-card p-6 shadow-warm sm:p-8"
    >
      <Field label="What are we cooking?" htmlFor="cw-query">
        <input
          id="cw-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Chicken tikka, or chicken + spinach + rice"
          className="h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
          required
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          Enter a dish name, or list ingredients you have.
        </p>
      </Field>

      <div className="mt-6">
        <Field label="Servings" htmlFor="cw-servings">
          <div className="inline-flex items-center gap-3 rounded-xl border border-input bg-background p-1">
            <StepperBtn ariaLabel="Decrease servings" onClick={() => setServings((s) => Math.max(1, s - 1))}>
              <Minus className="h-4 w-4" />
            </StepperBtn>
            <span id="cw-servings" className="w-8 text-center text-base font-medium tabular-nums text-foreground">
              {servings}
            </span>
            <StepperBtn ariaLabel="Increase servings" onClick={() => setServings((s) => Math.min(20, s + 1))}>
              <Plus className="h-4 w-4" />
            </StepperBtn>
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Cooking time available">
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((opt) => {
              const active = timeBucket === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTimeBucket(opt.value)}
                  aria-pressed={active}
                  className={`h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:border-primary/60"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-medium text-primary-foreground shadow-warm transition-all hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 disabled:opacity-60"
        disabled={!query.trim()}
      >
        <Sparkles className="h-4 w-4" />
        Generate My Recipe
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function StepperBtn({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary transition hover:bg-muted"
    >
      {children}
    </button>
  );
}