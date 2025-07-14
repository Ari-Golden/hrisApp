import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Attendance } from "@/types";

const statusLabel: Record<string, { label: string; color: string }> = {
    in: { label: "Masuk", color: "bg-green-100 text-green-700" },
    out: { label: "Pulang", color: "bg-blue-100 text-blue-700" },
    present: { label: "Hadir", color: "..." },
    late: { label: "Terlambat", color: "..." },
    absent: { label: "Alpa", color: "..." },
    leave: { label: "Cuti", color: "..." },
    sick: { label: "Sakit", color: "..." },
};

const columns: ColumnDef<Attendance>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (row.original.date ? format(new Date(row.original.date), "dd MMM yyyy") : ''),
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => row.original.time || '-',
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${statusLabel[row.original.status]?.color}`}
            >
                {statusLabel[row.original.status]?.label || row.original.status}
            </span>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
    },
];

interface EmployeeReportDataTableProps {
    data: Attendance[];
    exportFileName: string;
}

export function EmployeeReportDataTable({ data, exportFileName }: EmployeeReportDataTableProps) {
    return <DataTable columns={columns} data={data} exportFileName={exportFileName} />;
}