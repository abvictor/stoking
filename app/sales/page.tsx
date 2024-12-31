import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data-access/product/get-product";
import CreateSaleButton from "./_components/create-sale-button";

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
          <CreateSaleButton products={products} productOptions={productsOptions} />
        </div>
      </div>
    );
}

export default Sales