import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { IconCheck, IconAlertTriangle, IconBed, IconPlane, IconUserX } from "@tabler/icons-react"

type SummaryData = {
  present: number
  late: number
  leave: number
  sick: number
  absent: number
}

export function AttendanceSummaryCards({ summary }: { summary: SummaryData }) {
  const items = [
    { label: "Hadir", value: summary.present, icon: <IconCheck className="text-green-600" /> },
    { label: "Terlambat", value: summary.late, icon: <IconAlertTriangle className="text-yellow-600" /> },
    { label: "Cuti", value: summary.leave, icon: <IconPlane className="text-blue-600" /> },
    { label: "Sakit", value: summary.sick, icon: <IconBed className="text-purple-600" /> },
    { label: "Alpa", value: summary.absent, icon: <IconUserX className="text-red-600" /> },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
      {items.map((item, i) => (
        <Card key={i}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm">{item.label}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums">
            {item.value}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
