import { useState } from "react";
import { Clock, Users, ChevronDown, RefreshCw } from "lucide-react";
import type { Recipe } from "@/lib/cookwise-api";

export function RecipeOutput({ recipe, onReset }: { recipe: Recipe; onReset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <header className="text-center">
        <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
          {recipe.dishName}
        </h2>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Badge icon={<Clock className="h-3.5 w-3.5" />} label={`${recipe.totalTimeMinutes} min total`} />
          <Badge icon={<Users className="h-3.5 w-3.5" />} label={`${recipe.servings} servings`} />
        </div>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-[35fr_65fr]">
        <IngredientsList items={recipe.ingredients} />
        <StepsList steps={recipe.steps} />
      </div>

      {recipe.tips && recipe.tips.length > 0 ? <TipsAccordion tips={recipe.tips} /> : null}

      <div className="mt-12 flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-secondary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60"
        >
          <RefreshCw className="h-4 w-4" />
          Generate another recipe
        </button>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary">
      {icon}
      {label}
    </span>
  );
}

function IngredientsList({ items }: { items: Recipe["ingredients"] }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-warm sm:p-7">
      <h3 className="font-serif text-xl text-secondary">Ingredients</h3>
      <ul className="mt-5 space-y-3">
        {items.map((ing, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <input
              type="checkbox"
              id={`ing-${idx}`}
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[color:var(--primary)]"
            />
            <label htmlFor={`ing-${idx}`} className="cursor-pointer text-sm leading-relaxed text-foreground">
              {formatQty(ing.quantity, ing.unit)}
              <span className="text-foreground">{ing.item}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatQty(q: number | string | undefined, unit: string | undefined) {
  const parts: string[] = [];
  if (q !== undefined && q !== null && q !== "") parts.push(String(q));
  if (unit) parts.push(unit);
  const s = parts.join(" ").trim();
  return s ? <span className="mr-2 font-medium text-secondary">{s} </span> : null;
}

function StepsList({ steps }: { steps: Recipe["steps"] }) {
  return (
    <section>
      <h3 className="font-serif text-xl text-secondary">Instructions</h3>
      <ol className="mt-5 space-y-4">
        {steps.map((s) => (
          <li
            key={s.stepNumber}
            className="relative rounded-2xl border border-border bg-card p-5 pl-6 shadow-warm sm:p-6 sm:pl-7"
          >
            <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-primary" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-sm font-semibold text-secondary">
                  {s.stepNumber}
                </span>
                <p className="pt-1 text-[15px] leading-relaxed text-foreground">{s.instruction}</p>
              </div>
              {typeof s.timeMinutes === "number" && s.timeMinutes > 0 ? (
                <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {s.timeMinutes} min
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TipsAccordion({ tips }: { tips: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="mt-10 rounded-2xl border border-border bg-card shadow-warm">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-serif text-lg text-secondary">Tips</span>
        <ChevronDown className={`h-5 w-5 text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul className="space-y-3 border-t border-border px-6 py-5">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}