import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { EmployeeSummaryCards } from "./EmployeeSummaryCards";
import { EmployeeReportDataTable } from "./EmployeeReportDataTable";
import { Attendance, Employee } from "@/types";

interface EmployeeReportTableProps {
  data: Attendance[];
  employees: Employee[];
}

export function EmployeeReportTable({ data, employees }: EmployeeReportTableProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const filteredAttendance = data.filter((record) => {
    if (!selectedEmployeeId) return false;
    return record.employee_id.toString() === selectedEmployeeId;
  });

  const employeeName = employees.find(emp => emp.id.toString() === selectedEmployeeId)?.nama || "karyawan";
  const exportFileName = `laporan-absensi-${employeeName}-${new Date().toISOString().slice(0, 10)}`;

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
      </div>

      {selectedEmployeeId ? (
        <EmployeeReportDataTable data={filteredAttendance} exportFileName={exportFileName} />
      ) : (
        <div className="text-center py-6 border rounded-md">
          Silakan pilih karyawan untuk melihat laporan.
        </div>
      )}
    </div>
  );
}
