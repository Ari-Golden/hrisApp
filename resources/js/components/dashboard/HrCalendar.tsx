"use client"

import {
  Calendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { id } from "date-fns/locale"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"

const locales = { id }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

const events = [
  {
    title: "Interview Kandidat A",
    start: new Date(2025, 5, 25, 10, 0),
    end: new Date(2025, 5, 25, 11, 0),
  },
  {
    title: "Training Internal",
    start: new Date(2025, 5, 26, 13, 0),
    end: new Date(2025, 5, 26, 15, 0),
  },
  {
    title: "Cuti Karyawan B",
    start: new Date(2025, 5, 27),
    end: new Date(2025, 5, 29),
  },
]

export default function HrCalendar() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Kalender Kegiatan HR</CardTitle>
        <CardDescription>
          Jadwal kegiatan bulanan seperti cuti, interview, pelatihan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            views={["month", "week", "day"]}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
