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
import { toast } from "sonner";


interface DeleteProductProps {
    productId: number;
    name: string
}

const DeleteProductDialogContent = ({name, productId}: DeleteProductProps) => {
  const handleDeleteClick = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto excluído com sucesso")
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao excluir o produto");
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Deseja realmente <b>excluir</b> o produto{" "}
          <b>{name.toLocaleUpperCase()}</b>?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação de exclusão pode ser irreversível, deseja realmente
          continuar?
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
