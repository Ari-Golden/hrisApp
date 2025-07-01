import { useState } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { EmployeeSummaryCards } from "./EmployeeSummaryCards";
import { Attendance, Employee } from "@/types";

interface EmployeeReportTableProps {
  data: Attendance[];
  employees: Employee[];
}

const statusLabel = {
  in: { label: "Masuk", color: "bg-green-100 text-green-700" },
  out: { label: "Pulang", color: "bg-blue-100 text-blue-700" },
  present: { label: "Hadir", color: "..." },
  late: { label: "Terlambat", color: "..." },
  absent: { label: "Alpa", color: "..." },
  leave: { label: "Cuti", color: "..." },
  sick: { label: "Sakit", color: "..." },
};

export function EmployeeReportTable({ data, employees }: EmployeeReportTableProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // 'asc' for ascending, 'desc' for descending

  const filteredAttendance = data.filter((record) => {
    if (!selectedEmployeeId) return false; // Don't show anything if no employee is selected
    return record.employee_id.toString() === selectedEmployeeId;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  function exportExcel() {
    const sheetData = filteredAttendance.map(row => ({
      Tanggal: row.date ? format(new Date(row.date), "dd MMM yyyy") : '',
      Waktu: row.time || '-',
      Status: statusLabel[row.status]?.label || row.status,
      Lokasi: row.location,
    }));
    const sheet = XLSX.utils.json_to_sheet(sheetData);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Laporan Absensi");
    const buffer = XLSX.write(book, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const employeeName = employees.find(emp => emp.id.toString() === selectedEmployeeId)?.nama || "karyawan";
    saveAs(blob, `laporan-absensi-${employeeName}-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="space-y-4">
      {selectedEmployeeId && (
        <EmployeeSummaryCards attendanceRecords={filteredAttendance} />
      )}
      <div className="flex items-center gap-2">
        <Select onValueChange={setSelectedEmployeeId} value={selectedEmployeeId || ""}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Pilih Karyawan" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id.toString()}>
                {employee.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={exportExcel} disabled={!selectedEmployeeId || filteredAttendance.length === 0}>
          Export ke Excel
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table className="min-w-full text-sm">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="cursor-pointer" onClick={toggleSortOrder}>
                <div className="flex items-center gap-1">
                  Tanggal
                  {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lokasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date ? format(new Date(row.date), "dd MMM yyyy") : ''}</TableCell>
                  <TableCell>{row.time || '-'}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${statusLabel[row.status]?.color}`}
                    >
                      {statusLabel[row.status]?.label || row.status}
                    </span>
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  {selectedEmployeeId ? "Tidak ada data absensi untuk karyawan ini." : "Silakan pilih karyawan untuk melihat laporan."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
