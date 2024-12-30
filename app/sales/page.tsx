import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/product/get-product";
import UpsertSheetContent from "./_components/upsert-sheet-content";

const Sales = async () => {
    
    const products = await getProducts();
    const productsOptions: ComboboxOption[] = products.map((product) => ({
        label: product.name,
        value: String(product.id)
    }))


    return (
      <div className="w-full space-y-2 p-8">
        <div className="flex w-full items-center justify-between rounded-md bg-white p-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de vendas
            </span>
            <h2 className="text-xl font-semibold">Vendas</h2>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Nova venda</Button>
            </SheetTrigger>
            <UpsertSheetContent productOptions={productsOptions} products={products}/>
          </Sheet>
        </div>
      </div>
    );
}

export default Sales