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

    public function index()
    {

        $user_id = request('user');
        $role = request('_role');
        // query params
        $order = request('_order') ?? 'desc';
        $sort = request('_sort') ?? 'updated_at';
        $status = request('_status') ?? 'all';
        $page = request('_page') ?? 1;
        $search = request('_search') ?? '';

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


            // add scopeSearch
            if ($search) {
                $bookings = $bookings->search($search);
            }


            $bookings = $bookings->with([
                'customer',
                'laundries',
                'inventories' => function ($query) {
                    $query->withPivot('quantity_used');
                }
            ])->paginate($MAX_PAGES);

            return BookingResource::collection($bookings);
        }
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $booking = Booking::create(
            [
                'customer_id' => auth()->user()->id,
                'status' => 'pending',
                'total_price' => $data['total_price'],
            ]
        );
        if ($data['laundries']) $booking->laundries()->attach($data['laundries']);
        if ($data['inventories']) $booking->inventories()->attach($data['inventories']);
        $booking->load('laundries');
        $booking->load('inventories');
        return response(new BookingResource($booking), 201);
    }

    public function show(Booking $booking)
    {
        return new BookingResource($booking->load('laundries'));
    }


    public function update(UpdateRequest $request, Booking $booking)
    {
        $data = $request->validated();
        $booking->update($data);
        if ($data['laundries']) {
            $laundryData = [];
            foreach ($data['laundries'] as $laundry) {
                if (isset($laundry['laundry_id'])) {
                    $laundryData[$laundry['laundry_id']] = $laundry;
                }
            }
            $booking->laundries()->sync($laundryData);
        }
        $booking->load('laundries');
        return response(new BookingResource($booking), 201);
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }
}
