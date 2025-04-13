import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { loanColumns } from "./columns";
import api from "@/lib/api";
import LoanDialog from "./LoanDialog";
import { useNavigate } from "react-router-dom";

export type Loan = {
  id: number;
  bookId: number;
  memberId: number;
  loanDate: string;
  returnDate: string;
  book?: { id: number; title: string };
  member?: { id: number; name: string };
};

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const navigate = useNavigate();

  const fetchLoans = async () => {
    const { data: loansData } = await api.get("/loans");
    const { data: books } = await api.get("/books");
    const { data: members } = await api.get("/members");

    const enrichedLoans = loansData.map((loan: Loan) => ({
      ...loan,
      book: books.find((book: { id: number }) => book.id === loan.bookId),
      member: members.find((member: { id: number }) => member.id === loan.memberId),
    }));

    setLoans(enrichedLoans);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      await api.delete(`/loans/${id}`);
      fetchLoans();
    }
  };

  const handleEdit = (loan: Loan) => {
    setSelectedLoan(loan);
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
          <h1 className="text-2xl font-semibold">Empréstimos</h1>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setSelectedLoan(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Empréstimo
        </Button>
      </div>

      <DataTable columns={loanColumns(handleEdit, handleDelete)} data={loans} />

      <LoanDialog open={open} setOpen={setOpen} loan={selectedLoan} refresh={fetchLoans} />
    </div>
  );
}