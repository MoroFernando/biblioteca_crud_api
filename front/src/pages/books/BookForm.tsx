import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book } from "./Books";

type Props = {
  book: Book | null;
  onSaved: () => void;
};

export default function BookForm({ book, onSaved }: Props) {
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    publishedYear: ""
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        isbn: book.isbn,
        publishedYear: String(book.publishedYear)
      });
    } else {
      setForm({ title: "", isbn: "", publishedYear: "" });
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = book ? "PUT" : "POST";
    const url = book
      ? `http://localhost:3000/books/${book.id}`
      : `http://localhost:3000/books`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        publishedYear: Number(form.publishedYear)
      })
    });

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Input
        placeholder="ISBN"
        value={form.isbn}
        onChange={(e) => setForm({ ...form, isbn: e.target.value })}
      />
      <Input
        placeholder="Ano de publicação"
        type="number"
        value={form.publishedYear}
        onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
      />
      <Button type="submit" className="w-full">
        {book ? "Salvar alterações" : "Criar livro"}
      </Button>
    </form>
  );
}
