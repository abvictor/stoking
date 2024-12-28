"use server"

import { db } from "@/app/_lib/prisma";
import { DeleteProductSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const deleteProduct = async ({id}: DeleteProductSchema) => {
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidateTag("get-products");
};