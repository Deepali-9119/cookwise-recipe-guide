import { z } from "zod";

export const RecipeSchema = z.object({
  dishName: z.string(),
  servings: z.number(),
  totalTimeMinutes: z.number(),
  ingredients: z.array(
    z.object({
      item: z.string(),
      quantity: z.union([z.number(), z.string()]).optional(),
      unit: z.string().optional(),
    }),
  ),
  steps: z.array(
    z.object({
      stepNumber: z.number(),
      instruction: z.string(),
      timeMinutes: z.number().optional(),
    }),
  ),
  tips: z.array(z.string()).nullish(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export type TimeBucket = "under-15" | "15-30" | "30-60" | "60-plus";

export interface GenerateRecipeInput {
  query: string;
  servings: number;
  timeBucket: TimeBucket;
}

const WEBHOOK_URL =
  "https://deepali1automates.app.n8n.cloud/webhook/a3819878-9a6a-4f91-b66e-d2a4500f9ff0";

export async function generateRecipe(input: GenerateRecipeInput): Promise<Recipe> {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const raw = await res.json();
  const payload = Array.isArray(raw) ? raw[0] : raw;
  return RecipeSchema.parse(payload);
}