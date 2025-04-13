import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Member } from "./Members";

type Props = {
  member: Member | null;
  onSaved: () => void;
};

export default function MemberForm({ member, onSaved }: Props) {
  const [form, setForm] = useState({
    name: member ? member.name : "",
    email: member ? member.email : "",
    phone: member ? member.phone : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = member ? "PUT" : "POST";
    const url = member
      ? `http://localhost:3000/members/${member.id}`
      : `http://localhost:3000/members`;

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
      <Input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        placeholder="Telefone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <Button type="submit" className="w-full">
        {member ? "Salvar alterações" : "Criar membro"}
      </Button>
    </form>
  );
}