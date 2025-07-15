'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

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

interface LeaveTableProps {
    leaves: Leave[];
    handleEdit: (leave: Leave) => void;
    handleDelete: (id: number) => void;
}

export default function LeaveTable({ leaves, handleEdit, handleDelete }: LeaveTableProps) {
    const columns: ColumnDef<Leave>[] = [
        {
            id: 'employee_name',
            header: 'Nama Karyawan',
            cell: ({ row }) => row.original.employee?.nama ?? '-',
        },
        {
            accessorKey: 'leave_type',
            header: 'Jenis Cuti',
        },
        {
            accessorKey: 'start_date',
            header: 'Tanggal Mulai',
            cell: ({ row }) =>
                row.original.start_date
                    ? format(new Date(row.original.start_date), 'dd/MM/yyyy')
                    : '-',
        },
        {
            accessorKey: 'end_date',
            header: 'Tanggal Selesai',
            cell: ({ row }) =>
                row.original.end_date
                    ? format(new Date(row.original.end_date), 'dd/MM/yyyy')
                    : '-',
        },
        {
            accessorKey: 'reason',
            header: 'Alasan',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button onClick={() => handleEdit(row.original)} variant="outline" size="sm">
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(row.original.id)}
                        variant="destructive"
                        size="sm"
                    >
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            {leaves.length > 0 ? (
                <DataTable columns={columns} data={leaves} />
            ) : (
                <p className="text-sm text-gray-500">Belum ada data cuti.</p>
            )}
        </>
    );
}
