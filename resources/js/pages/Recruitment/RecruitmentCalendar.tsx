import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

type EventItem = {
  date: Date
  title: string
  note?: string
}

export function RecruitmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [events, setEvents] = useState<EventItem[]>([])
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")

  function handleAddEvent() {
    if (selectedDate && title.trim()) {
      setEvents([...events, { date: selectedDate, title, note }])
      setTitle("")
      setNote("")
    }
  }

  const eventsOnSelectedDate = selectedDate
    ? events.filter((e) => format(e.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
    : []

  return (
    <div className="grid gap-4 px-4">
      <div className="max-w-md">
        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
      </div>

      {selectedDate && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            Kegiatan {format(selectedDate, "dd MMM yyyy")}
          </h3>

          <ul className="space-y-1">
            {eventsOnSelectedDate.length === 0 && <li className="text-muted-foreground">Belum ada kegiatan</li>}
            {eventsOnSelectedDate.map((event, idx) => (
              <li key={idx} className="rounded-md border p-2">
                <div className="font-medium">{event.title}</div>
                {event.note && <div className="text-muted-foreground text-sm">{event.note}</div>}
              </li>
            ))}
          </ul>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Tambah Kegiatan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Jadwal untuk {format(selectedDate, "dd MMM yyyy")}</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Judul kegiatan (misal: Interview dengan Ayu Rahma)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Catatan tambahan (opsional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button onClick={handleAddEvent}>Simpan</Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}
