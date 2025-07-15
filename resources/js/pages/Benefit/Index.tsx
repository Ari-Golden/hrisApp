import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Benefit {
    id: number;
    nama: string;
    deskripsi: string;
    jenis: 'tunjangan' | 'potongan';
}

interface BenefitIndexProps {
    benefits: Benefit[];
}

export default function BenefitIndex({ benefits }: BenefitIndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this benefit?')) {
            destroy(route('benefit.destroy', id));
        }
    };

    const columns: ColumnDef<Benefit>[] = [
        {
            accessorKey: "nama",
            header: "Nama",
        },
        {
            accessorKey: "deskripsi",
            header: "Deskripsi",
        },
        {
            accessorKey: "jenis",
            header: "Jenis",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Link href={route('benefit.edit', row.original.id)}>
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
            <Head title="Benefit Management" />

            <h2 className="font-semibold text-xl p-4 ml-8 text-gray-800 leading-tight">Benefit Management</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <Link href={route('benefit.create')}>
                                    <Button>Create New Benefit</Button>
                                </Link>
                            </div>
                            <DataTable columns={columns} data={benefits} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}