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
  },
  {
    accessorKey: "author",
    header: "Autor",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(row.original)}
        >
          <Pencil size={16} />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];
