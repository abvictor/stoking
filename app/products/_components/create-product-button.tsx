"use client"

import { PlusIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Dialog, DialogTrigger} from "../../_components/ui/dialog";


import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";

const CreateProductButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent onSuccess={() => setDialogIsOpen(false)}/>
    </Dialog>
  );
};

export default CreateProductButton;
