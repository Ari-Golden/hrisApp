<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        return Inertia::render('Calendar/Index');
    }

    public function events(Request $request)
    {
        $start = $request->query('start');
        $end = $request->query('end');

        $candidateEvents = Candidate::whereBetween('appliedAt', [$start, $end])->get()->map(function ($candidate) {
            return [
                'id' => 'candidate-' . $candidate->id, // Unique ID for FullCalendar
                'title' => $candidate->name . ' - ' . $candidate->position,
                'start' => $candidate->appliedAt,
                'allDay' => true,
                'color' => '#4299e1', // Blue color for candidate events
                'sourceType' => 'candidate', // Custom property to identify source
            ];
        });

        $hrEvents = Event::whereBetween('start_date', [$start, $end])->get()->map(function ($event) {
            return [
                'id' => 'event-' . $event->id, // Unique ID for FullCalendar
                'title' => $event->title,
                'start' => $event->start_date,
                'end' => $event->end_date,
                'allDay' => false,
                'color' => $event->type === 'Recruitment' ? '#805ad5' : ($event->type === 'HR' ? '#38a169' : '#ecc94b'), // Purple for Recruitment, Green for HR, Yellow for General
                'sourceType' => 'event', // Custom property to identify source
            ];
        });

        $allEvents = $candidateEvents->concat($hrEvents);

        return response()->json($allEvents);
    }
}
