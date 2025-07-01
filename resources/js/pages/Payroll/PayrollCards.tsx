import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { IconCash, IconPigMoney, IconReceiptTax, IconDiscountCheck } from "@tabler/icons-react"

type PayrollSummary = {
  totalSalary: number
  totalAllowance: number
  totalDeductions: number
  totalTax: number
}

export function PayrollCards({ summary }: { summary: PayrollSummary }) {
  const cards = [
    {
      title: "Total Gaji",
      value: summary.totalSalary,
      icon: <IconCash className="text-green-600" />,
    },
    {
      title: "Tunjangan",
      value: summary.totalAllowance,
      icon: <IconPigMoney className="text-blue-600" />,
    },
    {
      title: "Potongan",
      value: summary.totalDeductions,
      icon: <IconDiscountCheck className="text-yellow-600" />,
    },
    {
      title: "Pajak",
      value: summary.totalTax,
      icon: <IconReceiptTax className="text-red-600" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 @4xl:grid-cols-4">
      {cards.map((item, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription className="text-2xl font-semibold tabular-nums">
                Rp {item.value.toLocaleString("id-ID")}
              </CardDescription>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Bulan berjalan · Terhitung update terakhir
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
