import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
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
        accessorKey: "employee.id_employee",
        header: "Employee ID",
    },
    {
        accessorKey: "employee.nama",
        header: "Name",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (row.original.date ? format(new Date(row.original.date), "dd MMM yyyy") : ''),
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${statusLabel[row.original.status]?.color}`}
            >
                {statusLabel[row.original.status]?.label}
            </span>
        ),
    },
];

export function AttendanceTable({ data }: { data: Attendance[] }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const filteredData = data.filter((row) => {
        const matchStatus = statusFilter === "all" || row.status === statusFilter;
        const attendanceDate = row.date ? new Date(row.date) : null;
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const matchDate = (!start || (attendanceDate && attendanceDate >= start)) && (!end || (attendanceDate && attendanceDate <= end));
        return matchStatus && matchDate;
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        value={startDate || ''}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="max-w-[180px]"
                        title="Tanggal Mulai"
                    />
                    <Input
                        type="date"
                        value={endDate || ''}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="max-w-[180px]"
                        title="Tanggal Akhir"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            <SelectItem value="present">Hadir</SelectItem>
                            <SelectItem value="late">Terlambat</SelectItem>
                            <SelectItem value="leave">Cuti</SelectItem>
                            <SelectItem value="sick">Sakit</SelectItem>
                            <SelectItem value="absent">Alpa</SelectItem>
                            <SelectItem value="in">Masuk</SelectItem>
                            <SelectItem value="out">pulang</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DataTable columns={columns} data={filteredData} exportFileName="attendance" />
        </div>
    );
}
