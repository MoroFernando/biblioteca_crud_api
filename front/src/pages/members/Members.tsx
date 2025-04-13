import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { memberColumns } from "./columns";
import api from "@/lib/api";
import MemberDialog from "./MemberDialog";
import { useNavigate } from "react-router-dom";

export type Member = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    const { data } = await api.get("/members");
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      await api.delete(`/members/${id}`);
      fetchMembers();
    }
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-2xl font-semibold">Membros</h1>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setSelectedMember(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Membro
        </Button>
      </div>

      <DataTable
        columns={memberColumns(handleEdit, handleDelete)}
        data={members}
      />

      <MemberDialog
        open={open}
        setOpen={setOpen}
        member={selectedMember}
        refresh={fetchMembers}
      />
    </div>
  );
}