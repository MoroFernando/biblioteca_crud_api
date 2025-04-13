import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { Category } from "./Categories";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: Category | null;
  refresh: () => void;
};

export default function CategoryDialog({ open, setOpen, category, refresh }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
        </DialogHeader>
        <CategoryForm category={category} onSaved={() => { refresh(); setOpen(false); }} />
      </DialogContent>
    </Dialog>
  );
}