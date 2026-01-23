<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class PublicEventController extends Controller
{
    public function index(): Response
    {
        $upcomingEvents = Event::where('is_active', true)
            ->where('start_date', '>=', now())
            ->orderBy('start_date')
            ->paginate(9);

        $pastEvents = Event::where('is_active', true)
            ->where('start_date', '<', now())
            ->orderBy('start_date', 'desc')
            ->paginate(6);

        return Inertia::render('events/index', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }

    public function show(Event $event): Response
    {
        if (!$event->is_active) {
            abort(404);
        }

        return Inertia::render('events/show', [
            'event' => $event,
            'relatedEvents' => Event::where('is_active', true)
                ->where('id', '!=', $event->id)
                ->where('start_date', '>=', now())
                ->orderBy('start_date')
                ->take(3)
                ->get(),
        ]);
    }
}
