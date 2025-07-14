import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IconUserSearch } from "@tabler/icons-react";

type Candidate = {
    id: number;
    name: string;
    position: string;
    status: "interview" | "shortlisted" | "pending" | "rejected";
    appliedAt: string;
};

const statusColor: Record<Candidate["status"], string> = {
    interview: "bg-blue-100 text-blue-700",
    shortlisted: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-700",
};

const columns: ColumnDef<Candidate>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <IconUserSearch className="size-4 text-muted-foreground" />
                <span>{row.original.name}</span>
            </div>
        ),
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "appliedAt",
        header: "Applied At",
        cell: ({ row }) => new Date(row.original.appliedAt).toLocaleDateString(),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge className={statusColor[row.original.status]}>
                {row.original.status.toUpperCase()}
            </Badge>
        ),
    },
];

export function CandidateCardList({ candidates }: { candidates: Candidate[] }) {
    return <DataTable columns={columns} data={candidates} exportFileName="candidates" />;
}
