import SidebarButton from "./sidebar-button";
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white">
      {/* imagem aqui */}
      <div></div>

      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOKING</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={20} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Vendas
        </SidebarButton>
      </div>
    </aside>
  );
};

export default Sidebar;
