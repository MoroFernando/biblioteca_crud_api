import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { authorColumns } from "./columns";
import api from "@/lib/api";
import AuthorDialog from "./AuthorDialog";
import { useNavigate } from "react-router-dom";

export type Author = {
  id: number;
  name: string;
  birthYear: number;
};

export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const navigate = useNavigate();

  const fetchAuthors = async () => {
    const { data } = await api.get("/authors");
    setAuthors(data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      await api.delete(`/authors/${id}`);
      fetchAuthors();
    }
  };

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
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
          <h1 className="text-2xl font-semibold">Autores</h1>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setSelectedAuthor(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Autor
        </Button>
      </div>

      <DataTable columns={authorColumns(handleEdit, handleDelete)} data={authors} />

      <AuthorDialog open={open} setOpen={setOpen} author={selectedAuthor} refresh={fetchAuthors} />
    </div>
  );
}