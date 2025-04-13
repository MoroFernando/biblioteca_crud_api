import { ColumnDef } from "@tanstack/react-table";
import { Loan } from "./Loans";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const loanColumns = (
  onEdit: (loan: Loan) => void,
  onDelete: (id: number) => void
): ColumnDef<Loan>[] => [
  {
    accessorKey: "book.title",
    header: "Livro",
    cell: ({ row }) => row.original.book?.title || "N/A",
  },
  {
    accessorKey: "member.name",
    header: "Membro",
    cell: ({ row }) => row.original.member?.name || "N/A",
  },
  {
    accessorKey: "loanDate",
    header: "Data do Empréstimo",
    cell: ({ row }) => new Date(row.original.loanDate).toLocaleDateString(),
  },
  {
    accessorKey: "returnDate",
    header: "Data de Devolução",
    cell: ({ row }) => new Date(row.original.returnDate).toLocaleDateString(),
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