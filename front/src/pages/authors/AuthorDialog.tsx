import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import AuthorForm from "./AuthorForm";
import { Author } from "./Authors";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  author: Author | null;
  refresh: () => void;
};

export default function AuthorDialog({ open, setOpen, author, refresh }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{author ? "Editar Autor" : "Novo Autor"}</DialogTitle>
        </DialogHeader>
        <AuthorForm author={author} onSaved={() => { refresh(); setOpen(false); }} />
      </DialogContent>
    </Dialog>
  );
}