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

        /**
         * REPORT STRUCTURE
         *  
         *  BOOKING_ID              CUSTOMER                LAUNDRIES                                           DATE
         *                                                  NAme        Price       Kilo        Sub Total
         * 
         * 
         *                                                                          Total:          
         */

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

        // get booking

    }


    public function yearlyRevenue()
    {


        /**
         * REPORT STRUCTURE
         * 
         * MONTH
         * BookingID     Total Amount     Item Used                                                 Booking Date
         *                                Name          Quantity Used           Item Cost
         * 
         *  
         *                                                                                                                        * Total Amount:                                                Item Total: 
         *                  
         *                  Total Amount: 
         *              -   Item Total:  
         * _____________________________________________________________________
         *                  Revenue:           
         * 
         * 
         */
        $year = request('year');

        // Get all bookings for the requested year with the related inventories
        $bookings = Booking::where('status', 'delivered')->whereYear('created_at', $year)
            ->with('inventories')
            ->get()
            ->map(function ($booking) {
                return [
                    'month' => $booking->created_at->format('F'),
                    'booking_id' => $booking->id,
                    'total_price' => $booking->total_price,
                    'items_used' => $booking->inventories->map(function ($inventory) {
                        $quantity_used = $inventory->pivot->quantity_used;
                        if (strpos($inventory->tags, 'detergent') !== false) {
                            $quantity_used /= 1000; // Convert to liters if the item is a detergent
                        }
                        $stock_cost = $quantity_used * $inventory->cost_per_stock;

                        return [
                            'name' => $inventory->item_name,
                            'stock' => $inventory->stock,
                            'quantity_used' => $quantity_used,
                            'cost_per_stock' => $inventory->cost_per_stock,
                            'stock_cost' => $stock_cost,
                        ];
                    }),
                    'booking_date' => $booking->created_at->format('Y-m-d'),
                ];
            });


        $monthlyBookings = $bookings->groupBy('month')->map(function ($bookings, $month) {
            $month = $month;
            $monthTotal = round($bookings->sum('total_price'), 3);
            $itemTotalInMonth = round($bookings->sum(function ($booking) {
                return $booking['items_used']->sum('stock_cost');
            }), 3);
            $revenue = round($monthTotal - $itemTotalInMonth, 3);

            return [
                'month' => $month,
                'monthtotal' => $monthTotal,
                'itemtotalinmonth' => $itemTotalInMonth,
                'revenue' => $revenue,
                'bookings' => $bookings->sortBy('booking_date')->map(function ($booking) {
                    $booking['total_price'] = round($booking['total_price'], 3);
                    $booking['items_used'] = $booking['items_used']->map(function ($item) {
                        $item['stock_cost'] = round($item['stock_cost'], 3);
                        return $item;
                    });
                    return $booking;
                })->values(),
            ];
        });

        return $monthlyBookings;
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
