<?php

namespace App\Http\Controllers\Api;

use App\Models\Delivery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response(Delivery::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'booking_id' => 'required|integer',
                'shipping_type' => 'required|string',
                'shipping_cost' => 'sometimes|numeric',
                'delivered_date' => 'required|date',
            ]
        );

        $shipping = [
            'standard' => 50,
            'express' => 100,
            'priority' => 150,
        ];
        $data['shipping_cost'] = $shipping[strtolower($data['shipping_type'] ?? 'standard')];



        $delivery = Delivery::create($data);
        return response($delivery, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $delivery = Delivery::where('booking_id', $id)->first();
        return response($delivery->with('booking')->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate(
            [
                'booking_id' => 'required|integer',
                'shipping_type' => 'required|string',
                'shipping_cost' => 'sometimes|numeric',
                'delivered_date' => 'required|date',
            ]
        );
        // find by booking_id
        $delivery = Delivery::where('booking_id', $id)->first();
        $delivery->update($data);
        return response($delivery, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delivery = Delivery::where('booking_id', $id)->first();
        $delivery->delete();
        return response(null, 204);
    }
}
