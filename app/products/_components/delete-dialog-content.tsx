import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";


interface DeleteProductProps {
    productId: number;
    name: string
}

const DeleteProductDialogContent = ({name, productId}: DeleteProductProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto excluído com sucesso.")
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o produto.");
    }
  })

  const handleDeleteClick = () => executeDeleteProduct({id: productId});
  
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Deseja realmente <b>excluir</b> o produto{" "}<b>{name.toLocaleUpperCase()}</b>?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação de exclusão pode ser irreversível, deseja realmente continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteClick}>
          Deletar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
