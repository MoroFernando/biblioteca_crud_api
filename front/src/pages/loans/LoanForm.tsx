import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import api from "@/lib/api";
import { Loan } from "./Loans";

type Props = {
  loan: Loan | null;
  onSaved: () => void;
};

export default function LoanForm({ loan, onSaved }: Props) {
  const [form, setForm] = useState({
    bookId: loan ? loan.bookId.toString() : "",
    memberId: loan ? loan.memberId.toString() : "",
    loanDate: loan ? new Date(loan.loanDate) : null,
    returnDate: loan ? new Date(loan.returnDate) : null,
  });

  const [books, setBooks] = useState<{ id: number; title: string }[]>([]);
  const [members, setMembers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [booksResponse, membersResponse] = await Promise.all([
        api.get("/books"),
        api.get("/members"),
      ]);
      setBooks(booksResponse.data);
      setMembers(membersResponse.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = loan ? "PUT" : "POST";
    const url = loan
      ? `http://localhost:3000/loans/${loan.id}`
      : `http://localhost:3000/loans`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        bookId: Number(form.bookId),
        memberId: Number(form.memberId),
        loanDate: form.loanDate ? form.loanDate.toISOString().split("T")[0] : null,
        returnDate: form.returnDate ? form.returnDate.toISOString().split("T")[0] : null,
      }),
    });

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Select
        value={form.bookId}
        onValueChange={(value) => setForm({ ...form, bookId: value })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um livro">
            {books.find((book) => book.id.toString() === form.bookId)?.title || "Selecione um livro"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {books.map((book) => (
            <SelectItem key={book.id} value={book.id.toString()}>
              {book.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={form.memberId}
        onValueChange={(value) => setForm({ ...form, memberId: value })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um membro">
            {members.find((member) => member.id.toString() === form.memberId)?.name || "Selecione um membro"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {members.map((member) => (
            <SelectItem key={member.id} value={member.id.toString()}>
              {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full text-left">
              {form.loanDate ? format(form.loanDate, "yyyy-MM-dd") : "Selecione a data de empréstimo"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={form.loanDate || undefined}
              onSelect={(date) => setForm({ ...form, loanDate: date || null })}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full text-left">
              {form.returnDate ? format(form.returnDate, "yyyy-MM-dd") : "Selecione a data de devolução"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={form.returnDate || undefined}
              onSelect={(date) => setForm({ ...form, returnDate: date || null })}
            />
          </PopoverContent>
        </Popover>
      <Button type="submit" className="w-full">
        {loan ? "Salvar alterações" : "Criar empréstimo"}
      </Button>
    </form>
  );
}