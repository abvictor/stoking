import { DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { Product } from "@prisma/client";


interface DropdownMenuProps {
  product: Pick<Product, 'id'>;
  onDelete: (productId: number) => void;
}

const SalesTableDropdownMenu = ({ product, onDelete }: DropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DialogTrigger asChild>
          <DropdownMenuItem className="gap 1.5">
            <EditIcon size={16} />
            Editar produto
          </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem className="gap 1.5" onClick={() => onDelete(product.id)}>
          <Trash2Icon size={16} />
          Remover produto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropdownMenu;