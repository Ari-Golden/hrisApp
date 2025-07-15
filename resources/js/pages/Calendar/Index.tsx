import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Event } from "@fullcalendar/core";

export default function CalendarPage({ auth }: PageProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<(Event & { sourceType: string }) | null>(null);
    const { delete: destroy } = useForm();

    const handleEventClick = (clickInfo: EventClickArg) => {
        const [sourceType, id] = clickInfo.event.id.split('-');
        setSelectedEvent({
            ...clickInfo.event,
            id: id,
            sourceType: sourceType,
        } as Event & { sourceType: string });
        setOpenDialog(true);
    };

    const handleDelete = () => {
        if (selectedEvent && selectedEvent.sourceType === 'event') {
            destroy(route("events.destroy", selectedEvent.id), {
                onSuccess: () => setOpenDialog(false),
            });
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Calendar" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Calendar</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                            A calendar of events for recruitment and HR.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link href={route("events.create")}>
                            <Button>Add Event</Button>
                        </Link>
                    </div>
                </div>
                <div className="mt-8">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        }}
                        events="/api/events"
                        eventClick={handleEventClick}
                    />
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedEvent?.title}</DialogTitle>
                    </DialogHeader>
                    <p>Start: {selectedEvent?.startStr}</p>
                    <p>End: {selectedEvent?.endStr}</p>
                    <DialogFooter>
                        {selectedEvent?.sourceType === 'event' && (
                            <Link href={route("events.edit", selectedEvent?.id)}>
                                <Button variant="outline">Edit</Button>
                            </Link>
                        )}
                        {selectedEvent?.sourceType === 'event' && (
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
