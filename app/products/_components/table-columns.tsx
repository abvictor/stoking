"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

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
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="gap 1.5"
              onClick={() => navigator.clipboard.writeText(String(product.id))}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem className="gap 1.5">
              <EditIcon size={16} />
              Editar produto
            </DropdownMenuItem>
            <DropdownMenuItem className="gap 1.5">
              <Trash2Icon size={16}/>
              Deletar produto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  },
];

