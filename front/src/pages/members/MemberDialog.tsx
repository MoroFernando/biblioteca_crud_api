import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import MemberForm from "./MemberForm";
import { Member } from "./Members";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  refresh: () => void;
};

export default function MemberDialog({ open, setOpen, member, refresh }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member ? "Editar Membro" : "Novo Membro"}</DialogTitle>
        </DialogHeader>
        <MemberForm member={member} onSaved={() => { refresh(); setOpen(false); }} />
      </DialogContent>
    </Dialog>
  );
}