import { ColumnDef } from "@tanstack/react-table";
import { Book } from "./Books";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const bookColumns = (
  onEdit: (book: Book) => void,
  onDelete: (id: number) => void
): ColumnDef<Book>[] => [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "publicationYear",
    header: "Ano de Publicação",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => row.original.category?.name || "N/A",
  },
  {
    accessorKey: "author",
    header: "Autor",
    cell: ({ row }) => row.original.author?.name || "N/A",
  },
  {
    id: "actions",
    header: () => <div className="text-right min-w-[100px]">Ações</div>, // Define largura mínima no cabeçalho
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end min-w-[100px]"> {/* Define largura mínima nas células */}
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer" // Adiciona cursor-pointer
          onClick={() => onEdit(row.original)}
        >
          <Pencil size={16} />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="cursor-pointer" // Adiciona cursor-pointer
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];