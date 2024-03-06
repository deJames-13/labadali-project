<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\Laundry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ChartsController extends Controller
{

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

        $laundries = Booking::with('laundries')->get()
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
            ->take(10);

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
        $customers = Booking::with('customer')->get()->groupBy('customer_id')->map(function ($customer) {
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
        $bookings = Booking::where('status', 'delivered')->get();
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

        $bookings = Booking::where('status', 'delivered')->get();
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
        $bookings = Booking::where('status', 'delivered')->get();
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
        $bookings = Booking::all();
        $monthlyBookings = $bookings->groupBy(function ($booking) {
            return $booking->created_at->format('F');
        })->map(function ($booking) {
            return $booking->count();
        });

        return response()->json([
            'labels' => $monthlyBookings->keys(),
            'dataSets' => [
                'label' => 'Monthly Bookings',
                'data' => $monthlyBookings->values(), 'backgroundColor' => "rgb(" . fake()->rgbColor() . ")",
            ]
        ]);
    }
}