import { AlertCircle } from "lucide-react";

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-warm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-secondary">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-serif text-2xl text-foreground">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        We couldn't put your recipe together this time. Let's try that again.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105"
      >
        Retry
      </button>
    </div>
  );
}