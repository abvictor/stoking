import { Metadata } from "next";
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-product";
import { getSales } from "../_data-access/sale/get-sale";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

export const metadata: Metadata = {
  title: "Stoking - Gestão de vendas",
  description: "Gerenciamento de vendas",
};

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
      <div className="w-full space-y-2 p-8 overflow-auto">
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de vendas</HeaderSubtitle>
            <HeaderTitle>Vendas</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <UpsertSaleButton
              products={products}
              productOptions={productOptions}
            />
          </HeaderRight>
        </Header>
        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    );
}

export default Sales