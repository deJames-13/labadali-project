<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Feedback::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'title' => 'sometimes|string',
            'body' => 'required|string',
            'rating' => 'sometimes|nullable|integer|min:1|max:5',
        ]);
        $feedback = Feedback::where('booking_id', $data['booking_id'])->first();
        if ($feedback) {
            return response()->json(['message' => 'Feedback already exists for this booking!'], 422);
        }
        $booking = Booking::find($data['booking_id']);
        $feedback = $booking->feedback()->create($data);
        return response()->json($feedback, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $bookingId)
    {
        // find feedback by booking_id
        $feedback = Feedback::where('booking_id', $bookingId)->first();
        if ($feedback) {
            return response()->json($feedback);
        }
        return response()->json(['message' => 'Not found!'], 422);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feedback $feedback)
    {
        $data = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'title' => 'sometimes|string',
            'body' => 'required|string',
            'rating' => 'sometimes|nullable|integer|min:1|max:5',
        ]);
        $feedback->update($data);
        return response()->json($feedback);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return response()->json(['message' => 'Feedback deleted successfully!'], 204);
    }
}
