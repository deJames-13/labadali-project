<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function monthlyBookings()
    {
        $startDate = request('start_date');
        $endDate = request('end_date');
        $bookings = Booking::where('status', 'delivered')->with([
            'customer',
            'laundries',
            'inventories' => function ($query) {
                $query->withPivot('quantity_used');
            }
        ])->hasDateRange($startDate, $endDate)->orderBy('created_at', 'desc')
            ->get();

        return BookingResource::collection($bookings);
    }
    public function revenueByLaundryType()
    {
        $startDate = request('start_date');
        $endDate = request('end_date');
    }




    public function monthlyRevenue()
    {
    }

    public function topLaundries()
    {
    }
    public function topCustomers()
    {
    }
    public function weeklyRevenue()
    {
    }
    public function bookingStatus()
    {
    }
}
