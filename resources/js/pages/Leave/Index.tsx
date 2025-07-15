import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useForm } from '@inertiajs/react';

import { FormEvent, useState } from 'react';
import LeaveTable from './LeaveTable';

// Import missing sidebar and breadcrumb components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface Employee {
    id: number;
    nama: string;
}

interface Leave {
    id: number;
    employee_id: number;
    employee: Employee | null;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string | null;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;
}

interface LeavePageProps {
    auth: {
        user: any; // Replace 'any' with the actual user type if available
    };
    leaves: Leave[];
    employees: Employee[];
}

export default function LeaveIndex({ auth, leaves, employees }: LeavePageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        id: null as number | null,
        employee_id: '' as string,
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
        status: 'pending',
    });

    const handleAdd = () => {
        setIsEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const handleEdit = (leave: Leave) => {
        setIsEditMode(true);
        setData({
            id: leave.id,
            employee_id: leave.employee_id.toString(),
            leave_type: leave.leave_type,
            start_date: leave.start_date,
            end_date: leave.end_date,
            reason: leave.reason ?? '',
            status: leave.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data cuti ini?')) {
            destroy(route('leaves.destroy', id));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            put(route('leaves.update', data.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                },
            });
        } else {
            post(route('leaves.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                },
            });
        }
    };

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
                                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Leave Management</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardHeader className="flex items-center justify-between">
                                        <CardTitle>Daftar Cuti</CardTitle>
                                        <Button onClick={handleAdd}>Tambah Cuti</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <LeaveTable leaves={leaves} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? 'Edit Permintaan Cuti' : 'Tambah Permintaan Cuti'}</DialogTitle>
                        <DialogDescription>{isEditMode ? 'Edit detail permintaan cuti.' : 'Tambahkan permintaan cuti baru.'}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        {/* Employee Selection */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employee_id" className="text-right">
                                Karyawan
                            </Label>
                            <Select onValueChange={(value) => setData('employee_id', value)} value={data.employee_id}>
                                <SelectTrigger className="col-span-3">
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
                            {errors.employee_id && <div className="col-span-4 text-right text-red-500">{errors.employee_id}</div>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="leave_type" className="text-right">
                                Jenis Cuti
                            </Label>
                            <Input
                                id="leave_type"
                                value={data.leave_type}
                                onChange={(e) => setData('leave_type', e.target.value)}
                                className="col-span-3"
                            />
                            {errors.leave_type && <div className="col-span-4 text-right text-red-500">{errors.leave_type}</div>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start_date" className="text-right">
                                Tanggal Mulai
                            </Label>
                            <Input
                                id="start_date"
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="col-span-3"
                            />
                            {errors.start_date && <div className="col-span-4 text-right text-red-500">{errors.start_date}</div>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="end_date" className="text-right">
                                Tanggal Selesai
                            </Label>
                            <Input
                                id="end_date"
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="col-span-3"
                            />
                            {errors.end_date && <div className="col-span-4 text-right text-red-500">{errors.end_date}</div>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">
                                Alasan
                            </Label>
                            <Textarea id="reason" value={data.reason} onChange={(e) => setData('reason', e.target.value)} className="col-span-3" />
                            {errors.reason && <div className="col-span-4 text-right text-red-500">{errors.reason}</div>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select onValueChange={(value) => setData('status', value as 'pending' | 'approved' | 'rejected')} value={data.status}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <div className="col-span-4 text-right text-red-500">{errors.status}</div>}
                        </div>

                        <DialogFooter>
                            <Button type="submit">{isEditMode ? 'Simpan Perubahan' : 'Tambah'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
