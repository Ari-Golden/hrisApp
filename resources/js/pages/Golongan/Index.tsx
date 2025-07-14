import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Golongan {
    id: number;
    kode: string;
    nama: string;
    keterangan: string;
    gaji: number;
}

interface GolonganIndexProps {
    golongans: Golongan[];
}

export default function GolonganIndex({ golongans }: GolonganIndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this golongan?')) {
            destroy(route('golongan.destroy', id));
        }
    };

    const columns: ColumnDef<Golongan>[] = [
        {
            accessorKey: "kode",
            header: "Kode",
        },
        {
            accessorKey: "nama",
            header: "Nama Golongan",
        },
        {
            accessorKey: "keterangan",
            header: "Keterangan",
        },
        {
            accessorKey: "gaji",
            header: "Gaji",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("gaji"));
                const formatted = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(amount);
                return <div className="text-left font-medium">{formatted}</div>;
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Link href={route('golongan.edit', row.original.id)}>
                        <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                        </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Golongan Management" />

            <h2 className="font-semibold text-xl p-4 ml-8 text-gray-800 leading-tight">Golongan Management</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <Link href={route('golongan.create')}>
                                    <Button>Create New Golongan</Button>
                                </Link>
                            </div>
                            <DataTable columns={columns} data={golongans} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}