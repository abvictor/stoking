import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-product";
import { getSales } from "../_data-access/sale/get-sale";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const Sales = async () => {

  const sales = await getSales();
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: String(product.id),
  }));
  
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

    return (
      <div className="w-full space-y-2 p-8">
        <div className="flex w-full items-center justify-between rounded-md bg-white p-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de vendas
            </span>
            <h2 className="text-xl font-semibold">Vendas</h2>
          </div>
          <UpsertSaleButton
            products={products}
            productOptions={productOptions}
          />
        </div>
        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    );
}

export default Sales