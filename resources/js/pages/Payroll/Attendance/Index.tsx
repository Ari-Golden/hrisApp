import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AttendanceSummaryCards } from './AttendanceSummaryCards';
import { AttendanceTable } from './AttendanceTable';
import { EmployeeReportTable } from './EmployeeReportTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



import { Attendance } from '@/types';

interface Props {
    attendance: Attendance[];
}

export default function Page({ attendance }: Props) {
    const calculateSummary = () => {
        let present = 0;
        let late = 0;
        let leave = 0;
        let sick = 0;
        let absent = 0;

        // Use a Map to store unique employee-day combinations and their statuses
        const dailyEmployeeStatus = new Map<string, Set<string>>(); // Key: 'date_employeeId', Value: Set of statuses

        attendance.forEach(record => {
            const key = `${record.date}_${record.employee_id}`;
            if (!dailyEmployeeStatus.has(key)) {
                dailyEmployeeStatus.set(key, new Set<string>());
            }
            dailyEmployeeStatus.get(key)?.add(record.status);
        });

        dailyEmployeeStatus.forEach(statuses => {
            if (statuses.has('in') && statuses.has('out')) {
                present++;
            } else if (statuses.has('late')) {
                late++;
            } else if (statuses.has('leave')) {
                leave++;
            } else if (statuses.has('sick')) {
                sick++;
            } else if (statuses.has('absent')) {
                absent++;
            }
            // Note: If an employee has 'in' but no 'out', or vice-versa, they are not counted as 'present' here.
            // You might need to refine this logic further based on your business rules for partial attendance.
        });

        return {
            present,
            late,
            leave,
            sick,
            absent,
        };
    };

    const summaryData = calculateSummary();

    const absentLeaveSickAttendance = attendance.filter(record => 
        record.status === 'absent' || record.status === 'leave' || record.status === 'sick'
    );

    // Extract unique employees from attendance data
    const uniqueEmployees = Array.from(new Map(attendance.map(item => [item.employee.id, item.employee])).values());

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Absensi</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <h1 className="px-4 lg:px-6 text-2xl font-bold">Data Absensi Karyawan</h1>
                            <div className="px-4 lg:px-6">
                                <AttendanceSummaryCards
                                    summary={summaryData}
                                />
                            </div>
                            <div className="px-4 lg:px-6">
                                <Tabs defaultValue="attendance_table" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="attendance_table">Absensi Harian</TabsTrigger>
                                        <TabsTrigger value="absence_table">Karyawan Tidak Masuk Kerja</TabsTrigger>
                                        <TabsTrigger value="employee_report">Laporan Per Karyawan</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="attendance_table">
                                        <AttendanceTable data={attendance} />
                                    </TabsContent>
                                    <TabsContent value="absence_table">
                                        <AttendanceTable data={absentLeaveSickAttendance} />
                                    </TabsContent>
                                    <TabsContent value="employee_report">
                                        <EmployeeReportTable data={attendance} employees={uniqueEmployees} />
                                    </TabsContent>
                                </Tabs>
                            </div>
                             
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
