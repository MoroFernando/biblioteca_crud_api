import { ColumnDef } from "@tanstack/react-table";
import { Category } from "./Categories";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const categoryColumns = (
  onEdit: (category: Category) => void,
  onDelete: (id: number) => void
): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "actions",
    header: () => <div className="text-right min-w-[100px]">Ações</div>,
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end min-w-[100px]">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => onEdit(row.original)}
        >
          <Pencil size={16} />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="cursor-pointer"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];