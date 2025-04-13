import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "./Categories";

type Props = {
  category: Category | null;
  onSaved: () => void;
};

export default function CategoryForm({ category, onSaved }: Props) {
  const [form, setForm] = useState({
    name: category ? category.name : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = category ? "PUT" : "POST";
    const url = category
      ? `http://localhost:3000/categories/${category.id}`
      : `http://localhost:3000/categories`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
      <Button type="submit" className="w-full">
        {category ? "Salvar alterações" : "Criar categoria"}
      </Button>
    </form>
  );
}