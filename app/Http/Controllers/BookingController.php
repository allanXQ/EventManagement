<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('event')->get();
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'user_email' => 'required|email'
        ]);

        $event = Event::find($request->event_id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if ($event->event_date <= now()) {
            return response()->json(['message' => 'Booking cannot be made for past events'], 400);
        }

        $booking = new Booking();
        $booking->event_id = $request->event_id;
        $booking->user_email = $request->user_email;
        $booking->save();

        return response()->json($booking, 201);
    }

    public function show(Booking $booking)
    {
        return response()->json($booking->load('event'));
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully']);
    }
}
