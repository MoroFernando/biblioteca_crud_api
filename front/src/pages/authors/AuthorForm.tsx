import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Author } from "./Authors";

type Props = {
  author: Author | null;
  onSaved: () => void;
};

export default function AuthorForm({ author, onSaved }: Props) {
  const [form, setForm] = useState({
    name: author ? author.name : "",
    birthYear: author ? author.birthYear : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = author ? "PUT" : "POST";
    const url = author
      ? `http://localhost:3000/authors/${author.id}`
      : `http://localhost:3000/authors`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        birthYear: Number(form.birthYear),
      }),
    });

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Ano de Nascimento"
        type="number"
        value={form.birthYear}
        onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
      />
      <Button type="submit" className="w-full">
        {author ? "Salvar alterações" : "Criar autor"}
      </Button>
    </form>
  );
}