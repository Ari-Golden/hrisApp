"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const salaryData = [
  { bulan: "Jan", gaji: 4500000 },
  { bulan: "Feb", gaji: 4700000 },
  { bulan: "Mar", gaji: 4800000 },
  { bulan: "Apr", gaji: 4900000 },
  { bulan: "Mei", gaji: 5100000 },
  { bulan: "Jun", gaji: 5200000 },
]

const chartConfig = {
  gaji: {
    label: "Gaji Rata-rata",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function SalaryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Gaji Karyawan</CardTitle>
        <CardDescription>Rata-rata gaji bulanan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis tickFormatter={(v) => `Rp${(v / 1_000_000).toFixed(1)}jt`} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="gaji"
                stroke="var(--color-gaji)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
