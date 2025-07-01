'use client';

import ExportablePDFArea from '@/components/dashboard/ExportablePDFArea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, XAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

import { useRef } from 'react';

const dataAbsensi = [
    { bulan: 'Jan', hadir: 20, izin: 2, sakit: 1, cuti: 1 },
    { bulan: 'Feb', hadir: 18, izin: 3, sakit: 2, cuti: 0 },
    { bulan: 'Mar', hadir: 22, izin: 1, sakit: 0, cuti: 1 },
    { bulan: 'Apr', hadir: 21, izin: 2, sakit: 1, cuti: 0 },
    { bulan: 'Mei', hadir: 20, izin: 1, sakit: 2, cuti: 1 },
    { bulan: 'Jun', hadir: 19, izin: 2, sakit: 2, cuti: 1 },
];

// Warna custom untuk stack bar
const chartConfig = {
    hadir: {
        label: 'Hadir',
        color: 'var(--chart-1)',
    },
    izin: {
        label: 'Izin',
        color: 'var(--chart-2)',
    },
    sakit: {
        label: 'Sakit',
        color: 'var(--chart-3)',
    },
    cuti: {
        label: 'Cuti',
        color: 'var(--chart-4)',
    },
} satisfies ChartConfig;

export default function AbsensiChart() {
    const chartRef = useRef<HTMLDivElement>(null);

    

    return (
        <Card>
            <CardHeader>
                <CardTitle>Grafik Absensi Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex justify-end">{/* <Button onClick={handleExportPDF}>Export PDF</Button> */}</div>

                <ExportablePDFArea ref={chartRef}>
                    {/* chart dan konten kamu */}
                    <ChartContainer config={chartConfig}>
                        <BarChart data={dataAbsensi}>
                            <XAxis dataKey="bulan" />
                            <Bar dataKey="hadir" stackId="a" fill="var(--color-hadir)" />
                            <Bar dataKey="izin" stackId="a" fill="var(--color-izin)" />
                            <Bar dataKey="sakit" stackId="a" fill="var(--color-sakit)" />
                            <Bar dataKey="cuti" stackId="a" fill="var(--color-cuti)" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                    </ChartContainer>
                </ExportablePDFArea>
            </CardContent>
        </Card>
    );
}
