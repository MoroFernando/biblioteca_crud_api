import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { bookColumns } from "./columns";
import api from "@/lib/api";
import BookDialog from "./BookDialog";

export type Book = {
  id: number;
  title: string;
  isbn: string;
  publishedYear: number;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      await api.delete(`/books/${id}`);
      fetchBooks();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Livros</h1>
        <Button onClick={() => { setSelectedBook(null); setOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Novo Livro
        </Button>
      </div>

      <DataTable columns={bookColumns(setSelectedBook, handleDelete)} data={books} />

      <BookDialog open={open} setOpen={setOpen} book={selectedBook} refresh={fetchBooks} />
    </div>
  );
}
