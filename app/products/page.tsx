import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";

import { getProducts } from "../_data-access/product/get-product";
import AddProductButton from "./_components/add-product-button";


export const dynamic = "force-dynamic"

const ProductsPage = async () => {
    const products = await getProducts();
    return (
      <div className="w-full space-y-2 p-8">
        <div className="flex w-full items-center justify-between rounded-md bg-white p-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de produtos
            </span>
            <h2 className="text-xl font-semibold">Produtos</h2>
          </div>
          <AddProductButton />
        </div>
        <DataTable columns={productTableColumns} data={products} />
      </div>
    );
}

export default ProductsPage;