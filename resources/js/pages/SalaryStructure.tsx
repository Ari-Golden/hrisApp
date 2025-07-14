import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';


interface Golongan {
    id: number;
    nama: string;
    gaji: number;
}

interface SalaryStructureProps {
    golongans: Golongan[];
}

const columns: ColumnDef<Golongan>[] = [
    {
        accessorKey: "nama",
        header: "Golongan Name",
    },
    {
        accessorKey: "gaji",
        header: "Salary",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("gaji"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(amount);
            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
];

export default function SalaryStructure({ golongans }: SalaryStructureProps) {
    return (
        <AppLayout>
            <Head title="Salary Structure" />

            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Salary Structure</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Golongan Salary Structure</h3>
                            <div className="flex justify-end mb-4">
                                <Link href={route('golongan.index')}>
                                    <Button>Manage Golongan</Button>
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