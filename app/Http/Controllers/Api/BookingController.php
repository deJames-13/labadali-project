<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\StoreRequest;
use App\Http\Requests\Booking\UpdateRequest;
use App\Http\Resources\BookingResource;
use App\Models\Customer;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BookingResource::collection(Booking::all()->load('laundries'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (!Customer::where('id', auth()->user()->id)->exists()) {
            return response()->json([
                'message' => 'Please set your profile',
            ], 400);
        }

        $booking = Booking::create(
            [
                'customer_id' => auth()->user()->id,
                'status' => 'pending',
                'total_price' => $data['total_price'],
            ]

        );
        $booking->laundries()->attach($data['laundries']);
        $booking->load('laundries');
        return response(new BookingResource($booking), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return new BookingResource($booking->load('laundries'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Booking $booking)
    {
        $data = $request->validated();
        $booking->update($data);
        if ($data['laundries']) {
            $booking->laundries()->sync($data['laundries']);
        }
        $booking->load('laundries');
        return response(new BookingResource($booking), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }
}
