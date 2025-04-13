import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./Members";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const memberColumns = (
  onEdit: (member: Member) => void,
  onDelete: (id: number) => void
): ColumnDef<Member>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
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