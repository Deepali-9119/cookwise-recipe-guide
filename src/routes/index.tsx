import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Nav } from "@/components/cookwise/Nav";
import { Hero } from "@/components/cookwise/Hero";
import { RecipeForm } from "@/components/cookwise/RecipeForm";
import { LoadingState } from "@/components/cookwise/LoadingState";
import { ErrorState } from "@/components/cookwise/ErrorState";
import { RecipeOutput } from "@/components/cookwise/RecipeOutput";
import { generateRecipe, type GenerateRecipeInput, type Recipe } from "@/lib/cookwise-api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const mutation = useMutation<Recipe, Error, GenerateRecipeInput>({
    mutationFn: generateRecipe,
  });

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (input: GenerateRecipeInput) => {
    mutation.mutate(input);
    setTimeout(scrollToForm, 50);
  };

  const handleReset = () => {
    mutation.reset();
    setTimeout(scrollToForm, 50);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Nav onCtaClick={scrollToForm} />
      <main>
        <Hero onStart={scrollToForm} />

        <section
          ref={formSectionRef}
          className="scroll-mt-20 border-t border-border/60 bg-[color:var(--muted)]/40 px-5 py-16 sm:px-8 md:py-24"
        >
          <div className="mx-auto max-w-[1200px]">
            {mutation.isIdle && (
              <div>
                <div className="mx-auto mb-10 max-w-[600px] text-center">
                  <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                    Tell us what you're cooking
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground">
                    Three quick details. We'll handle the rest.
                  </p>
                </div>
                <RecipeForm onSubmit={handleSubmit} />
              </div>
            )}

            {mutation.isPending && <LoadingState />}

            {mutation.isError && <ErrorState onRetry={() => mutation.reset()} />}

            {mutation.isSuccess && mutation.data && (
              <RecipeOutput recipe={mutation.data} onReset={handleReset} />
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CookWise
      </footer>
    </div>
  );
}
