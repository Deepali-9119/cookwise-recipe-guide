import { ChefHat } from "lucide-react";

export function Nav({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2 text-secondary">
          <ChefHat className="h-6 w-6" strokeWidth={1.75} />
          <span className="font-serif text-xl font-semibold tracking-tight">CookWise</span>
        </a>
        <button
          onClick={onCtaClick}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0"
        >
          Generate a Recipe
        </button>
      </div>
    </header>
  );
}