<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = request('_role');
        if ($role == 'admin') {
            $users = User::all();
            $users->load('admin');
            return UserResource::collection($users);
        }

        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $role = $request->only('role')['role'];

        if ($role == 'customer') {
            $this->store_customer($request);
        };
        if ($role == 'admin') {
            $this->store_admin($request);
        };


        return response($request);
    }
    private function store_customer($request)
    {
        $userData = $request->only('username', 'email');

        $user = User::where('username', $userData['username'])->first();
        $user->update($userData);

        $customerData = $request->only(
            'first_name',
            'last_name',
            'address',
            'city',
            'region',
            'zip_code',
            'birthdate',
            'phone_number',
            'age'
        );

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName =   date('His') . '_' . $image->getClientOriginalName() .  $image->getClientOriginalExtension();

            $path = $image->storeAs('customers', $fileName, 'public');
            $customerData['image_path'] = "http://localhost:8000/storage/" . $path;
        }
        $user->customer()->create($customerData);
        return response($user->load('customer'));
    }

    private function store_admin($request)
    {
        $userData = $request->only('username', 'email');

        $user = User::where('username', $userData['username'])->first();
        $user->update($userData);

        $adminData = $request->only(
            'first_name',
            'last_name',
            'address',
            'city',
            'region',
            'zip_code',
            'birthdate',
            'phone_number',
            'age'
        );

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName =   date('His') . '_' . $image->getClientOriginalName() .  $image->getClientOriginalExtension();

            $path = $image->storeAs('admin', $fileName, 'public');
            $adminData['image_path'] = "http://localhost:8000/storage/" . $path;
        }
        $user->admin()->create($adminData);
        return response($user->load('admin'));
    }



    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if ($user->isCustomer()) {
            $user->load('customer');
        }
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        $userData = $request->only('username', 'email');
        $user->update($userData);
        if ($user->isCustomer()) {
            $user->load('customer');
            $customerData = $request->only(
                'first_name',
                'last_name',
                'address',
                'city',
                'region',
                'zip_code',
                'birthdate',
                'age'
            );

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = $image->getClientOriginalName();
                $fileName =   date('His') . '_' . $fileName;

                $path = $image->storeAs('customers', $fileName, 'public');
                $customerData['image_path'] = "http://localhost:8000/storage/" . $path;
            }
            $user->customer()->update($customerData);
        }
        return new UserResource($user->load('customer'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
