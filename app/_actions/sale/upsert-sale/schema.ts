import { z } from "zod";

export const upsertSaleSchema = z.object({
  id: z.number().optional(),
  products: z.array(
    z.object({
      id: z.number(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type UpsertSaleSchema = z.infer<typeof upsertSaleSchema>;
