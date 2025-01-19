import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";

import { getProducts } from "../_data-access/product/get-product";
import CreateProductButton from "./_components/create-product-button";
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { Metadata } from "next";



export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Stoking - Gestão de Produtos",
  description: "Gerenciamento de produtos",
};

const ProductsPage = async () => {
    const products = await getProducts();
    
    return (
      <div className="w-full space-y-2 p-8 overflow-auto">
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
            <HeaderTitle>Produtos</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <CreateProductButton />
          </HeaderRight>
        </Header>
        <DataTable columns={productTableColumns} data={products} />
      </div>
    );
}

export default ProductsPage;