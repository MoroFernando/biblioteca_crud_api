import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import LoanForm from "./LoanForm";
import { Loan } from "./Loans";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  loan: Loan | null;
  refresh: () => void;
};

export default function LoanDialog({ open, setOpen, loan, refresh }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{loan ? "Editar Empréstimo" : "Novo Empréstimo"}</DialogTitle>
        </DialogHeader>
        <LoanForm loan={loan} onSaved={() => { refresh(); setOpen(false); }} />
      </DialogContent>
    </Dialog>
  );
}