<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Http\Resources\InventoryResource;
use App\Models\Booking;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->has('tags')) {
            return response(InventoryResource::collection(Inventory::hasTag(request('tags'))->get()));
        }
        if (request()->has('bookingId')) {
            $booking = Booking::find(request('bookingId'));
            $booking->load(['inventories' => function ($query) {
                $query->withPivot('quantity_used');
            }]);
            return response(new BookingResource($booking));
        }

        return response(InventoryResource::collection(Inventory::all()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "item_name" => 'required|string',
            "stock" => 'required|numeric',
            "tags" => 'required|string',
            "instructions" => 'required|string',
            "image" => 'sometimes|image',
            "image_path" => 'sometimes|string',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = $image->getClientOriginalExtension();
            $fileName =  'inventoryitem_' . date('His');
            $path = $image->storeAs('inventories', $fileName, 'public');
            $data['image_path'] =  $path;
        }

        $inventory = Inventory::create($data);

        return response(new InventoryResource($inventory), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "item_name" => 'sometimes|string',
            "stock" => 'sometimes|numeric',
            "tags" => 'sometimes|string',
            "instructions" => 'sometimes|string',
            "image" => 'sometimes|image',
            "image_path" => 'nullable',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = $image->getClientOriginalExtension();
            $fileName =  'inventoryitem_' . date('His');
            $path = $image->storeAs('inventories', $fileName, 'public');
            $data['image_path'] =  $path;
        }

        $inventory = Inventory::find($id);
        $inventory->update($data);

        return response(new InventoryResource($inventory), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $inventory = Inventory::find($id);
        $inventory->delete();
        return response()->json(['message' => 'Inventory deleted successfully']);
    }
}
