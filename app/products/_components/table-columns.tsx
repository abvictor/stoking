"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, CircleIcon } from "lucide-react";

const getStatusLabel = (status: string) => {
    if(status === "IN_STOCK"){
        return 'Em estoque'
    }else{
        return "Fora de estoque";
    }
}

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
        const product = row.row.original;
        const label = getStatusLabel(product.status);
        return (
          <Badge
            variant="default"
            className={label === "Em estoque" ? "bg-green-500" : "bg-red-500"}
          >
            {label}
          </Badge>
        );
    }
  },
];
