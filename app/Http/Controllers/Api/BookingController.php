<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Http\Requests\Booking\StoreRequest;
use App\Http\Requests\Booking\UpdateRequest;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()

    {

        $user_id = request('user');
        $role = request('_role');
        // query params
        $order = request('_order') ?? 'asc';
        $sort = request('_sort') ?? 'created_at';
        $status = request('_status') ?? 'all';
        $page = request('_page') ?? 1;
        $MAX_PAGES = request('_max_page') ?? 20;

        if ($user_id) {
            $user = User::find($user_id);
            if ($role == 'customer') {

                $bookings = Booking::where('customer_id', $user_id)->orderBy($sort, $order);
                if ($status != 'all') {
                    $bookings = $bookings->where('status', $status);
                }
                $bookings = $bookings->paginate($MAX_PAGES);
                $bookings->load('laundries');

                return BookingResource::collection($bookings);
            }
        } else {
            $bookings = Booking::orderBy($sort, $order);

            if ($status != 'all') {
                $bookings = $bookings->where('status', $status);
            }

            $bookings = $bookings->with(['customer', 'laundries'])->paginate($MAX_PAGES);

            return BookingResource::collection($bookings);
        }
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

            $laundryIds = array_column($data['laundries'], 'laundry_id');
            $laundryData = array_combine($laundryIds, $data['laundries']);
            $booking->laundries()->sync($laundryData);
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
