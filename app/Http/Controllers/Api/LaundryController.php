<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Laundry\StoreRequest;
use App\Http\Requests\Laundry\UpdateRequest;
use App\Http\Resources\LaundryResource;
use App\Models\Laundry;

class LaundryController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        // query params
        $order = request('_order') ?? 'asc';
        $sort = request('_sort') ?? 'updated_at';
        $search = request('_search') ?? null;
        $searchBy = request('_searchBy') ?? null;

        $query = Laundry::query();
        if ($search && $searchBy) {

            $query
                ->where("$searchBy", 'like', "%{$search}%");
        } else if ($search) {
            // query search
            $query
                ->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }
        $laundries = $query->orderBy($sort, $order)->get();



        return LaundryResource::collection($laundries);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $laundry = Laundry::create($data);
        return response()->json(new LaundryResource($laundry), 201, ['message' => 'Laundry created successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Laundry $laundry)
    {
        return response(new LaundryResource($laundry));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Laundry $laundry)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = $image->getClientOriginalName();
            $fileName =   date('His') . '_' . $fileName;
            $path = $image->storeAs('laundries', $fileName, 'public');
            $data['image_path'] =  $path;
        }
        $laundry->update($data);
        return response(new LaundryResource($laundry), 200, ['message' => 'Laundry updated successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laundry $laundry)
    {
        $laundry->delete();
        return response()->json(['message' => 'Laundry deleted successfully!'], 200);
    }
}
