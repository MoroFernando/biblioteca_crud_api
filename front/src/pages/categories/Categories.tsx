import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { categoryColumns } from "./columns";
import api from "@/lib/api";
import CategoryDialog from "./CategoryDialog";
import { useNavigate } from "react-router-dom";

export type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const { data } = await api.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
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
          <h1 className="text-2xl font-semibold">Categorias</h1>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setSelectedCategory(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Nova Categoria
        </Button>
      </div>

      <DataTable columns={categoryColumns(handleEdit, handleDelete)} data={categories} />

      <CategoryDialog open={open} setOpen={setOpen} category={selectedCategory} refresh={fetchCategories} />
    </div>
  );
}