import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Benefit {
    id: number;
    nama: string;
    jenis: 'tunjangan' | 'potongan';
}

interface Golongan {
    id: number;
    nama: string;
}

interface Amount {
    id: number;
    benefit: Benefit;
    golongan: Golongan;
    jumlah: number;
}

interface AmountIndexProps {
    amounts: Amount[];
}

export default function AmountIndex({ amounts }: AmountIndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this amount?')) {
            destroy(route('amount.destroy', id));
        }
    };

    const columns: ColumnDef<Amount>[] = [
        {
            accessorKey: "benefit.nama",
            header: "Benefit",
        },
        {
            accessorKey: "golongan.nama",
            header: "Golongan",
        },
        {
            accessorKey: "jumlah",
            header: "Jumlah",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("jumlah"));
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
                    <Link href={route('amount.edit', row.original.id)}>
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
            <Head title="Amount Management" />

            <h2 className="font-semibold text-xl p-4 ml-8 text-gray-800 leading-tight">Amount Management</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <Link href={route('amount.create')}>
                                    <Button>Create New Amount</Button>
                                </Link>
                            </div>
                            <DataTable columns={columns} data={amounts} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}