import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Event {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    type: "Recruitment" | "HR" | "General";
}

interface EditEventPageProps extends PageProps {
    event: Event;
}

export default function EditEventPage({ auth, event }: EditEventPageProps) {
    const { data, setData, put, errors, processing } = useForm({
        title: event.title,
        start_date: event.start_date.slice(0, 16), // Format for datetime-local input
        end_date: event.end_date.slice(0, 16),     // Format for datetime-local input
        type: event.type,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route("events.update", event.id));
    }

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Event" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Edit Event</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                            Edit an existing event in the calendar.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                        </div>
                        <div>
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input
                                id="start_date"
                                type="datetime-local"
                                value={data.start_date}
                                onChange={(e) => setData("start_date", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.start_date && <p className="mt-2 text-sm text-red-600">{errors.start_date}</p>}
                        </div>
                        <div>
                            <Label htmlFor="end_date">End Date</Label>
                            <Input
                                id="end_date"
                                type="datetime-local"
                                value={data.end_date}
                                onChange={(e) => setData("end_date", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            {errors.end_date && <p className="mt-2 text-sm text-red-600">{errors.end_date}</p>}
                        </div>
                        <div>
                            <Label htmlFor="type">Type</Label>
                            <Select onValueChange={(value) => setData("type", value)} defaultValue={data.type}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Recruitment">Recruitment</SelectItem>
                                    <SelectItem value="HR">HR</SelectItem>
                                    <SelectItem value="General">General</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
                        </div>
                        <div className="flex items-center justify-end">
                            <Button type="submit" disabled={processing}>
                                Update Event
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}