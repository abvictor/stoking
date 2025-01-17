"use client"
import { useState } from "react";

import { PlusIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Dialog, DialogTrigger} from "../../_components/ui/dialog";


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
      <UpsertProductDialogContent setDialogIsOpen={setDialogIsOpen}/>
    </Dialog>
  );
};

export default CreateProductButton;
