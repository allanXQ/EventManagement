<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'image' => 'image|nullable|max:1999'
        ]);

        $event = new Event($request->only(['title', 'description', 'event_date']));

        if ($request->hasFile('image')) {
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
            $event->image = $fileNameToStore;
        }

        $event->save();

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'event_date' => 'sometimes|required|date',
            'image' => 'image|nullable|max:1999'
        ]);

        $event->update($request->only(['title', 'description', 'event_date']));

        if ($request->hasFile('image')) {
            if ($event->image) {
                Storage::delete('public/images/' . $event->image);
            }

            $filenameWithExt = $request->file('image')->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
            $event->image = $fileNameToStore;
        }

        $event->save();

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        if ($event->image) {
            Storage::delete('public/images/' . $event->image);
        }
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }
}
