'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

interface EmployeeTaxResult {
    id: number;
    nama: string;
    gajiPokok: number;
    tunjangan: number;
    potongan: number;
    penghasilanBruto: number;
    biayaJabatan: number;
    penghasilanNeto: number;
    penghasilanNetoDisetahunkan: number;
    ptkpStatus: string;
    ptkpValue: number;
    penghasilanKenaPajak: number;
    pph21TerutangTahunan: number;
    pph21TerutangBulanan: number;
}



interface TaxCalculationTableProps {
    data: EmployeeTaxResult[];
    formatCurrency: (value: number) => string;
}

export default function TaxCalculationTable({ data = [], formatCurrency }: TaxCalculationTableProps) {
    const columns: ColumnDef<z.infer<typeof employeeTaxResultSchema>>[] = [
        {
            accessorKey: 'nama',
            header: 'Nama',
        },
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
            accessorKey: 'penghasilanBruto',
            header: 'Bruto',
            cell: ({ row }) => formatCurrency(row.original.penghasilanBruto),
        },
        {
            accessorKey: 'biayaJabatan',
            header: 'Biaya Jabatan',
            cell: ({ row }) => formatCurrency(row.original.biayaJabatan),
        },
        {
            accessorKey: 'penghasilanNeto',
            header: 'Neto',
            cell: ({ row }) => formatCurrency(row.original.penghasilanNeto),
        },
        {
            accessorKey: 'penghasilanNetoDisetahunkan',
            header: 'Neto Tahunan',
            cell: ({ row }) => formatCurrency(row.original.penghasilanNetoDisetahunkan),
        },
        {
            accessorKey: 'ptkpStatus',
            header: 'PTKP',
            cell: ({ row }) => `${row.original.ptkpStatus} (${formatCurrency(row.original.ptkpValue)})`,
        },
        {
            accessorKey: 'penghasilanKenaPajak',
            header: 'PKP',
            cell: ({ row }) => formatCurrency(row.original.penghasilanKenaPajak),
        },
        {
            accessorKey: 'pph21TerutangTahunan',
            header: 'PPh21 Tahunan',
            cell: ({ row }) => formatCurrency(row.original.pph21TerutangTahunan),
        },
        {
            accessorKey: 'pph21TerutangBulanan',
            header: 'PPh21 Bulanan',
            cell: ({ row }) => formatCurrency(row.original.pph21TerutangBulanan),
        },
    ];

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Tax Calculation Result Table</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada data perhitungan pajak.</p>
                ) : (
                    <DataTable columns={columns} data={data} />
                )}
            </CardContent>
        </Card>
    );
}