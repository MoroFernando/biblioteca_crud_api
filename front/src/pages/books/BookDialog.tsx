import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import BookForm from "./BookForm";
import { Book } from "./Books";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  book: Book | null;
  refresh: () => void;
};

export default function BookDialog({ open, setOpen, book, refresh }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book ? "Editar Livro" : "Novo Livro"}</DialogTitle>
        </DialogHeader>
        <BookForm book={book} onSaved={() => { refresh(); setOpen(false); }} />
      </DialogContent>
    </Dialog>
  );
}
