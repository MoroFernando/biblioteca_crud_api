import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book } from "./Books";
import api from "@/lib/api";

type Props = {
  book: Book | null;
  onSaved: () => void;
};

export default function BookForm({ book, onSaved }: Props) {
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    publicationYear: "",
    categoryId: "",
    authorId: ""
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Fetch categories and authors from the API
    const fetchData = async () => {
      const [categoriesResponse, authorsResponse] = await Promise.all([
        api.get("/categories"),
        api.get("/authors")
      ]);
      setCategories(categoriesResponse.data);
      setAuthors(authorsResponse.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        isbn: book.isbn,
        publicationYear: String(book.publicationYear),
        categoryId: String(book.categoryId),
        authorId: String(book.authorId)
      });
    } else {
      setForm({ title: "", isbn: "", publicationYear: "", categoryId: "", authorId: "" });
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
        publicationYear: Number(form.publicationYear)
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
        value={form.publicationYear}
        onChange={(e) => setForm({ ...form, publicationYear: e.target.value })}
      />
      <Select
        value={form.categoryId}
        onValueChange={(value) => setForm({ ...form, categoryId: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={form.authorId}
        onValueChange={(value) => setForm({ ...form, authorId: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um autor" />
        </SelectTrigger>
        <SelectContent>
          {authors.map((author) => (
            <SelectItem key={author.id} value={author.id}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full">
        {book ? "Salvar alterações" : "Criar livro"}
      </Button>
    </form>
  );
}