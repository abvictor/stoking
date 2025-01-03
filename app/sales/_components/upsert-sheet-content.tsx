"use client"

import { Button } from "@/app/_components/ui/button"
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table"
import { formatCurrency } from "@/app/_helpers/currency"
import { zodResolver } from "@hookform/resolvers/zod"
import { Product } from "@prisma/client"
import { CheckCheckIcon, PlusIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SalesTableDropdownMenu from "./table-dropdown-menu"
import { createSale } from "@/app/_actions/sale/create-sale"
import { toast } from "sonner"


const formSchema = z.object({
    productId: z.coerce.number({
        message: "O produto é obrigatório"
    }),
    quantity: z.coerce.number().int().positive()
})

type FormSchema = z.infer<typeof formSchema>

interface UpsertSheetContentProps{
    products: Product[];
    productOptions: ComboboxOption[];
    onSubmitSuccess: () => void;
}

interface SelectedProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const UpsertSheetContent = ({
  productOptions,
  products,
  onSubmitSuccess,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: undefined,
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productId: number) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    try {
      await createSale({
        products: selectedProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      toast.success("Venda realizada com sucesso.");
      onSubmitSuccess()
    } catch (error) {}
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações para a venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantidade desejada"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-2 w-full gap-2"
            variant="secondary"
          >
            <PlusIcon size={16} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className="font-medium">{product.quantity}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <SalesTableDropdownMenu product={product} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter>
        <Button
          className="mt-2 w-full gap-2"
          variant="default"
          disabled={selectedProducts.length == 0}
          onClick={onSubmitSale}
        >
          <CheckCheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent