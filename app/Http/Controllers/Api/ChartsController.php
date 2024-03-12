<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\Laundry;
use App\Models\Customer;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Claims\Custom;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ChartsController extends Controller
{
    // FETCH STATS DATA
    public function dashstats()
    {
        // get the following data in json
        // 
        /**
         * 
         * 
         * title: "New Users", // new customers, get count from customer table 
         * value: "34.7k",     // value
         * icon: <UserGroupIcon className="w-8 h-8" />,
         * description: "↗︎ 2300 (22%)", // actual compare this year customer and last year customer
         * 
         *
         * title: "Total Booking Sales", // from a month ago
         * value: "$34,545",
         * icon: <CreditCardIcon className="w-8 h-8" />,
         * description: "Past month",
         *
         *
         * title: "Pending Booking",  // get status of booking that is pending and count it
         * value: "450",
         * icon: <CircleStackIcon className="w-8 h-8" />,
         * description: "50 in hot leads", // no value
         *
         *
         * title: "Active Users",
         * value: "5.6k",   // just get random value on the count of customer
         * icon: <UsersIcon className="w-8 h-8" />,
         * description: "↙ 300 (18%)",
         *
         */

        $newUsers = Customer::whereYear('created_at', date('Y'))->count();
        $lastYearUsers = Customer::whereYear('created_at', date('Y', strtotime('-1 year')))->count();
        $userIncrease = $newUsers - $lastYearUsers;

        $totalBookingSales = Booking::where('status', 'delivered')
            ->where('created_at', '>=', now()->subMonth())
            ->sum('total_price');
        $pendingBookings = Booking::where('status', 'pending')->count();

        $activeUsers = rand(1, Customer::count()); // Assuming active users are all customers

        $data = [
            [
                'title' => 'New Users',
                'value' => $newUsers,
                'icon' => 'UserGroupIcon',
                'description' => "↗︎ $userIncrease (" . round($userIncrease / $lastYearUsers * 100, 2) . "%)",
            ],
            [
                'title' => 'Total Booking Sales',
                'value' => "P" . number_format($totalBookingSales, 2),
                'icon' => 'CreditCardIcon',
                'description' => 'Past month',
            ],
            [
                'title' => 'Pending Booking',
                'value' => $pendingBookings,
                'icon' => 'CircleStackIcon',
                'description' => '50 in hot leads', // This needs to be clarified
            ],
            [
                'title' => 'Active Users',
                'value' => $activeUsers,
                'icon' => 'UsersIcon',
                'description' => "↙ 300 (18%)", // This needs to be calculated
            ],
        ];

        return response()->json($data);
    }


    // FETCH BOOKING CHARTS 

    // CHART FORMAT - based on Chart JS 
    /* TO BE PASSED TO REACT FRONTEND
    {
        labels: []
        dataSets: {
            label: 'Total Revenue',
            data: []
        }
    }
    */


    // Chart for Top 10 Popular Laundries based on booking->laundries count groupd by their id, get the top 10
    /*
    returns a chart JS format JSON
    */
    public function topLaundries()
    {

        $laundries = Booking::where('status', 'delivered')->orderBy('created_at', 'asc')->with('laundries')->get()
            ->pluck('laundries')
            ->flatten()
            ->groupBy('title')
            ->map(function ($laundry) {
                return [
                    'count' => $laundry->count(),
                    'color' => "rgb(" . fake()->rgbColor() . ")",
                ];
            })
            ->sortDesc()
            ->take(5);

        $labels = $laundries->keys();
        $data = $laundries->pluck('count');
        $colors = $laundries->pluck('color');

        return response()->json([
            'labels' => $labels,
            'dataSets' => [
                'label' => 'Top Laundries',
                'data' => $data,
                'backgroundColor' => $colors,
            ]
        ]);
    }

    // Chart for Top 10 Customers based on number of bookings 
    /*
    returns a chart JS format JSON
    */
    public function topCustomers()
    {
        $customers = Booking::where('status', 'delivered')->with('customer')->get()->groupBy('customer_id')->map(function ($customer) {
            return $customer->count();
        })->sortDesc()->take(10);

        return response()->json([
            'labels' => $customers->keys(),
            'dataSets' => [
                'label' => 'Top Customers',
                'data' => $customers->values(), 'backgroundColor' => "rgb(" . fake()->rgbColor() . ")",
            ]
        ]);
    }

    // Chart for Monthly Revenue of successfully [delivered] bookings 
    /*
    returns a chart JS format JSON
    */
    public function monthlyRevenue()
    {
        $bookings = Booking::where('status', 'delivered')->orderBy('created_at', 'asc')->get();
        $monthlyRevenue = $bookings->groupBy(function ($booking) {
            return $booking->created_at->format('F');
        })->map(function ($booking) {
            return $booking->sum('total_price');
        });

        return response()->json([
            'labels' => $monthlyRevenue->keys(),
            'dataSets' => [
                'label' => 'Monthly Revenue',
                'data' => $monthlyRevenue->values(), 'backgroundColor' => "rgb(" . fake()->rgbColor() . ")",
            ]
        ]);
    }
    // Chart for Daily Revenue of successfully [delivered] bookings 
    /*
    returns a chart JS format JSON
    */
    public function weeklyRevenue()
    {

        $bookings = Booking::where('status', 'delivered')->orderBy('created_at', 'asc')->get();
        $weeklyRevenue = $bookings->groupBy(function ($booking) {
            return $booking->created_at->startOfWeek()->format('m-d-Y');
        })->map(function ($booking) {
            return [
                'total' => $booking->sum('total_price'),
                'color' => "rgb(" . fake()->rgbColor() . ")",
            ];
        });

        $labels = $weeklyRevenue->keys();
        $data = $weeklyRevenue->pluck('total');
        $colors = $weeklyRevenue->pluck('color');

        return response()->json([
            'labels' => $labels,
            'dataSets' => [
                'label' => 'Weekly Revenue',
                'data' => $data,
                'backgroundColor' => $colors,
            ]
        ]);
    }

    // Chart for Bookings Status -  A chart showing the number of bookings in each status ['pending', 'ongoing','finished', 'delivered', 'cancelled']
    /*
    returns a chart JS format JSON
    */
    public function bookingStatus()
    {

        $bookingStatus = Booking::all()
            ->groupBy('status')
            ->map(function ($booking) {
                return [
                    'count' => $booking->count(),
                    'color' => "rgb(" . fake()->rgbColor() . ")",
                ];
            });

        $labels = $bookingStatus->keys();
        $data = $bookingStatus->pluck('count');
        $colors = $bookingStatus->pluck('color');

        return response()->json([
            'labels' => $labels,
            'dataSets' => [
                'label' => 'Booking Status',
                'data' => $data,
                'backgroundColor' => $colors,
            ]
        ]);
    }

    // Revenue by Laundry Type Chart: A chart showing the total revenue generated by each type of laundry.
    /*
    returns a chart JS format JSON
    */
    public function revenueByLaundryType()
    {
        $bookings = Booking::where('status', 'delivered')->orderBy('created_at', 'asc')->get();
        $revenueByLaundryType = $bookings->groupBy(function ($booking) {
            return $booking->laundries->first()->type;
        })->map(function ($booking) {
            return $booking->sum('total_price');
        });

        return response()->json([
            'labels' => $revenueByLaundryType->keys(),
            'dataSets' => [
                'label' => 'Revenue By Laundry Type',
                'data' => $revenueByLaundryType->values(), 'backgroundColor' => "rgb(" . fake()->rgbColor() . ")",
            ]
        ]);
    }


    // Chart for Total Number of Bookings each Month
    /*
    returns a chart JS format JSON
    */
    public function monthlyBookings()
    {
        $bookings = Booking::where('status', 'delivered')->orderBy('created_at', 'asc')->get();
        $monthlyBookings = $bookings->groupBy(function ($booking) {
            return $booking->created_at->format('F');
        })->map(function ($booking) {
            return $booking->count();
        });

        return response()->json([
            'labels' => $monthlyBookings->keys(),
            'dataSets' => [
                'label' => 'Monthly Bookings',
                'data' => $monthlyBookings->values(),
                'backgroundColor' => "rgb(" . fake()->rgbColor() . ")",
            ]
        ]);
    }
}
