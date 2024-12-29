"use client";
import { useState } from "react";
import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"

import { Button } from "@/app/_components/ui/button";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import DeleteProductDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import ProductDropdownMenu from "./table-dropdown-menu";

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
    cell: (row) => {
      const product = row.row.original
      return  Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(Number(product.price))
    }
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
    cell: (row) => { <ProductDropdownMenu product={row.row.original} /> }
  },
];

