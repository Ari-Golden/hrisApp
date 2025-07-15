'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency } from '@/lib/formatter';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface Employee {
    id: number;
    nama: string;
    status_pernikahan: string;
    jumlah_tanggungan: number;
    golongan?: {
        gaji?: string;
        amounts?: { jumlah: string }[];
    };
}

interface PayrollProcessProps {
    employees: Employee[];
}

interface PayrollResult {
    id: number;
    nama: string;
    gajiPokok: number;
    tunjangan: number;
    potongan: number;
    bruto: number;
    biayaJabatan: number;
    neto: number;
    pph21: number;
    gajiBersih: number;
}

export default function PayrollProcess({ employees = [] }: PayrollProcessProps) {
    const [results, setResults] = useState<PayrollResult[]>([]);

    const processPayroll = () => {
        if (!employees.length) {
            console.warn('⚠️ Tidak ada data employees!');
            return;
        }

        const data = employees.map((emp) => {
            const gajiPokok = parseFloat(emp.golongan?.gaji ?? '0');
            const tunjangan = emp.golongan?.amounts?.reduce((sum, a) => sum + parseFloat(a.jumlah ?? '0'), 0) || 0;
            const potongan = 0;

            const bruto = gajiPokok + tunjangan;
            const biayaJabatan = Math.min(bruto * 0.05, 500000);
            const neto = bruto - biayaJabatan - potongan;

            const netoTahunan = neto * 12;
            const status = emp.status_pernikahan === 'menikah' ? 'K' : 'TK';
            const tanggungan = Math.min(emp.jumlah_tanggungan, 3);
            const ptkpStatus = `${status}/${tanggungan}`;

            const ptkpMap: Record<string, number> = {
                'TK/0': 54000000,
                'TK/1': 58500000,
                'TK/2': 63000000,
                'TK/3': 67500000,
                'K/0': 58500000,
                'K/1': 63000000,
                'K/2': 67500000,
                'K/3': 72000000,
            };

            const ptkp = ptkpMap[ptkpStatus] ?? 54000000;
            const pkp = Math.max(0, netoTahunan - ptkp);

            let pph = 0;
            if (pkp <= 60000000) {
                pph = pkp * 0.05;
            } else if (pkp <= 250000000) {
                pph = 60000000 * 0.05 + (pkp - 60000000) * 0.15;
            } else {
                pph = 60000000 * 0.05 + 190000000 * 0.15 + (pkp - 250000000) * 0.25;
            }

            const gajiBersih = neto - pph / 12;

            return {
                id: emp.id,
                nama: emp.nama,
                gajiPokok,
                tunjangan,
                potongan,
                bruto,
                biayaJabatan,
                neto,
                pph21: pph / 12,
                gajiBersih,
            };
        });

        setResults(data);
    };

    useEffect(() => {
        // Auto-process saat komponen mount
        processPayroll();
    }, []);

    const columns: ColumnDef<PayrollResult>[] = [
        { accessorKey: 'nama', header: 'Nama Karyawan' },
        {
            accessorKey: 'gajiPokok',
            header: 'Gaji Pokok',
            cell: ({ row }) => formatCurrency(row.original.gajiPokok),
        },
        {
            accessorKey: 'tunjangan',
            header: 'Tunjangan',
            cell: ({ row }) => formatCurrency(row.original.tunjangan),
        },
        {
            accessorKey: 'potongan',
            header: 'Potongan',
            cell: ({ row }) => formatCurrency(row.original.potongan),
        },
        {
            accessorKey: 'bruto',
            header: 'Bruto',
            cell: ({ row }) => formatCurrency(row.original.bruto),
        },
        {
            accessorKey: 'neto',
            header: 'Neto',
            cell: ({ row }) => formatCurrency(row.original.neto),
        },
        {
            accessorKey: 'pph21',
            header: 'PPh 21/Bulan',
            cell: ({ row }) => formatCurrency(row.original.pph21),
        },
        {
            accessorKey: 'gajiBersih',
            header: 'Gaji Bersih',
            cell: ({ row }) => formatCurrency(row.original.gajiBersih),
        },
    ];

    return (
        <SidebarProvider>
            <AppLayout>
                <div className="flex flex-col gap-4 p-4">
                <Card className="w-full">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Proses Payroll</CardTitle>
                        <button onClick={processPayroll} className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            Proses Ulang
                        </button>
                    </CardHeader>
                    <CardContent>
                        {results.length > 0 ? (
                            <DataTable columns={columns} data={results} />
                        ) : (
                            <p className="text-sm text-gray-500">Tidak ada data payroll yang diproses.</p>
                        )}
                    </CardContent>
                </Card>
                </div>
            </AppLayout>
        </SidebarProvider>
    );
}
