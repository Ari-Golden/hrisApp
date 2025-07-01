import { useState } from "react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
// @ts-ignore

import { Attendance } from "@/types";

const statusLabel = {
  in: { label: "Masuk", color: "bg-green-100 text-green-700" },
  out: { label: "Pulang", color: "bg-blue-100 text-blue-700" },
  present: { label: "Hadir", color: "..." },
  late: { label: "Terlambat", color: "..." },
  absent: { label: "Alpa", color: "..." },
  leave: { label: "Cuti", color: "..." },
  sick: { label: "Sakit", color: "..." },
}


export function AttendanceTable({ data }: { data: Attendance[] }) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [startDate, setStartDate] = useState<string | null>(null); // New state for start date
  const [endDate, setEndDate] = useState<string | null>(null);     // New state for end date
  console.log(data)

  const filtered = data.filter((row) => {
    const matchStatus = statusFilter === "all" || row.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchSearch =
      row.employee.nama.toLowerCase().includes(searchLower) ||
      row.employee_id.toString().toLowerCase().includes(searchLower) ||
      (row.date && format(new Date(row.date), "dd MMM yyyy").toLowerCase().includes(searchLower)) ||
      (row.time && row.time.toLowerCase().includes(searchLower)) ||
      (row.status && statusLabel[row.status]?.label.toLowerCase().includes(searchLower)) ||
      (row.employee.email && row.employee.email.toLowerCase().includes(searchLower)) ||
      (row.employee.jabatan?.nama_jabatan && row.employee.jabatan.nama_jabatan.toLowerCase().includes(searchLower)) ||
      (row.employee.departemen?.nama_departemen && row.employee.departemen.nama_departemen.toLowerCase().includes(searchLower)) ||
      (row.employee.golongan?.nama_golongan && row.employee.golongan.nama_golongan.toLowerCase().includes(searchLower));

    const attendanceDate = row.date ? new Date(row.date) : null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchDate = (!start || (attendanceDate && attendanceDate >= start)) && (!end || (attendanceDate && attendanceDate <= end));

    return matchStatus && matchSearch && matchDate;
  });

  function exportExcel() {
    const sheet = XLSX.utils.json_to_sheet(filtered)
    const book = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(book, sheet, "Attendance")
    const buffer = XLSX.write(book, { bookType: "xlsx", type: "array" })
    const blob = new Blob([buffer], { type: "application/octet-stream" })
    saveAs(blob, `absensi-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Cari semua data…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
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
        <div className="flex items-center gap-2">
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
          <Button variant="outline" onClick={exportExcel}>
            Export ke Excel
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table className="min-w-full text-sm">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.employee.id_employee}</TableCell>
                  <TableCell>{row.employee.foto_selfie}--{row.employee.nama}</TableCell>
                  <TableCell>{row.date ? format(new Date(row.date), "dd MMM yyyy") : ''}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${statusLabel[row.status].color}`}
                    >
                      {statusLabel[row.status].label}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
