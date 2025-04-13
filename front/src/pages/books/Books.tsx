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
  publicationYear: number;
  categoryId: string;
  authorId: string;
  category?: { id: string; name: string }; // Adicionado para armazenar os dados da categoria
  author?: { id: string; name: string };   // Adicionado para armazenar os dados do autor
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    const { data: booksData } = await api.get("/books");
    const { data: authors } = await api.get("/authors"); // Busca todos os autores
    const { data: categories } = await api.get("/categories"); // Busca todas as categorias

    // Enriquecer os livros com os dados de autor e categoria
    const enrichedBooks = booksData.map((book: Book) => ({
      ...book,
      author: authors.find((author: { id: string }) => author.id === book.authorId),
      category: categories.find((category: { id: string }) => category.id === book.categoryId),
    }));

    setBooks(enrichedBooks);
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

  const handleEdit = (book: Book) => {
    setSelectedBook(book); // Define o livro selecionado
    setOpen(true); // Abre o diálogo
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Livros</h1>
        <Button className="cursor-pointer" onClick={() => { setSelectedBook(null); setOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Novo Livro
        </Button>
      </div>

      <DataTable columns={bookColumns(handleEdit, handleDelete)} data={books} />

      <BookDialog open={open} setOpen={setOpen} book={selectedBook} refresh={fetchBooks} />
    </div>
  );
}