import { z } from "zod";

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const createProductSchema = z.object({
    name: z.string().trim().min(3,{
        message: "Nome do produto é obrigatório"
    }),
    price: z.number().min(0.01, {
        message: "O preço do produto é obrigatório"
    }),
    stock: z.coerce.number().positive({
      message: 'A quantidade deve ser positiva'
    }).int().min(0, {
        message: "A quantidade do produto é obrigatória"
    }),
})
