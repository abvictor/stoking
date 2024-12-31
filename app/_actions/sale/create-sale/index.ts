"use server"

import { db } from '@/app/_lib/prisma';
import { CreateSaleSchema, createSaleSchema} from './schema'
import { revalidateTag } from 'next/cache';

export const createSale = async (data:CreateSaleSchema) =>{
    createSaleSchema.parse(data);
    await db.$transaction(async (tsc) => {
      const sale = await db.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of data.products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          throw new Error("Produto não encontrado.");
        }

        const productIsOutOfStock = product.quantity > productFromDb.stock;

        if (productIsOutOfStock) {
          throw new Error("Quantidade indisponível em estoque.");
        }

        await tsc.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });

        await tsc.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    })
    revalidateTag("get-products");
}