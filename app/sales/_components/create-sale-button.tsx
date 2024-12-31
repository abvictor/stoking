"use client"

import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import UpsertSheetContent from "./upsert-sheet-content"
import { Button } from "@/app/_components/ui/button"
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";


interface CreateSaleButtonProps{
    products: Product[];
    productOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
      const [sheetIsOpen, setSheetIsOpen] = useState(false);
      
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Nova venda</Button>
      </SheetTrigger>
      <UpsertSheetContent
        {...props}
        onSubmitSuccess={() => setSheetIsOpen(false)}
      />
    </Sheet>
  );
};

export default CreateSaleButton