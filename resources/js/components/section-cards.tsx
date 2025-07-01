import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

export function SectionCards() {
    const { props } = usePage<{
        totalEmployee: number;
        totalMaleEmployee: number;
        totalFemaleEmployee: number;
        newEmployee: number;
        terminatedEmployee: number;
        leaveEmployee: number;
    }>();

    const cards = [
        {
            label: 'Total Pegawai',
            value: props.totalEmployee,
            trend: '+5.2%',
            up: true,
            desc: 'Kenaikan dari bulan lalu',
            subdesc: `L: ${props.totalMaleEmployee} • P: ${props.totalFemaleEmployee}`,
        },

        {
            label: 'Pegawai Baru',
            value: props.newEmployee,
            trend: '+3.1%',
            up: true,
            desc: 'Perekrutan bulan ini',
            subdesc: 'Data berdasarkan tanggal join',
        },
        {
            label: 'Tidak Aktif',
            value: props.terminatedEmployee,
            trend: '-1.8%',
            up: false,
            desc: 'Penurunan karyawan aktif',
            subdesc: 'Status non-aktif',
        },
        {
            label: 'Cuti',
            value: props.leaveEmployee,
            trend: '+0%',
            up: true,
            desc: 'Tetap stabil',
            subdesc: 'Perlu monitoring ke depan',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
            {cards.map((item, idx) => (
                <Card className="@container/card" key={idx}>
                    <CardHeader>
                        <CardDescription>{item.label}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{item.value}</CardTitle>
                                <div className="text-muted-foreground">
                                    <span>
                                        {' '}
                                       KaryawanLaki-laki: {props.totalMaleEmployee} <br></br> KaryawanPerempuan: {props.totalFemaleEmployee}{' '}
                                    </span>
                                </div>
                        <CardAction>
                            <Badge variant="outline">
                                {item.up ? <IconTrendingUp /> : <IconTrendingDown />}
                                {item.trend}
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Kenaikan dari bulan lalu <IconTrendingUp className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
