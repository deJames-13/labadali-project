<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;

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
        $_role = request('_role') ??  $request['_role'] ?? 'admin';

        if ($_role == 'customer') {
            return $this->store_customer($request);
        };
        if ($_role == 'admin') {
            return $this->store_admin($request);
        };
    }
    private function store_customer($request)
    {
        $userData = $request->only('username', 'email');

        $user = User::where('id', $request['id'])->first();
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
        $user->load('customer');
        return response(new UserResource($user));
    }

    private function store_admin($request)
    {
        $userData = $request->only('username', 'email');


        $user = User::where('username', $userData['username'])->first();
        if ($user) {
            $user->update($userData);
        } else {
            $data = $request->only('username', 'email', 'password');
            $user = User::create([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
        }



        $adminData = $request->only(
            'first_name',
            'last_name',
            'address',
            'city',
            'region',
            'zip_code',
            'position',
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
        $user->load('admin');
        return response(new UserResource($user));
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

        $_role = request('_role') ??  $request['_role'] ?? 'admin';

        $userData = $request->only('username', 'email');
        $user->update($userData);

        $data = $request->only(
            'first_name',
            'last_name',
            'address',
            'city',
            'region',
            'zip_code',
            'birthdate',
            'age',
            'position',
        );

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = $image->getClientOriginalName();
            $fileName =   date('His') . '_' . $fileName;
            $path = $image->storeAs($user->isCustomer() ? 'customers' : 'admins', $fileName, 'public');
            $data['image_path'] = "http://localhost:8000/storage/" . $path;
        }

        if ($_role === 'customer') {
            $user->load('customer');
        } else {
            $user->load('admin');
            $user->admin()->update($data);
        }

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(['message' => 'Removed Succesfully'], 201);
    }
}
