import { useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import DeleteProductDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";

import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { ProductDto } from "@/app/_data-access/product/get-product";

interface ProductTableDropdownMenuProps {
  product: ProductDto;
}

const ProductTableDropdownMenu = ({ product }: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
    return (
      <AlertDialog>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="gap 1.5"
                onClick={() =>
                  navigator.clipboard.writeText(String(product.id))
                }
              >
                <ClipboardCopyIcon size={16} />
                Copiar ID
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap 1.5">
                  <EditIcon size={16} />
                  Editar produto
                </DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap 1.5">
                  <Trash2Icon size={16} />
                  Deletar produto
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpsertProductDialogContent
            defaultValues={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock,
            }}
            setDialogIsOpen={setEditDialogOpen}
          />
          <DeleteProductDialogContent
            name={product.name}
            productId={product.id}
          />
        </Dialog>
      </AlertDialog>
    );
}

export default ProductTableDropdownMenu;