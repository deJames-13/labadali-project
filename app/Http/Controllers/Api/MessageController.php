<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Admin;
use App\Models\Message;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Resources\CustomerResource;
use App\Http\Requests\Message\StoreRequest;
use App\Http\Requests\Message\UpdateRequest;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::has('messages')
            ->with(['messages' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->get();
        $admins = Admin::has('messages')->get();
        return response()->json([
            'customers' => CustomerResource::collection($customers),
            'admins' => $admins,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $data['sender_type'] = $data['sender_type'] === 'customer' ? Customer::class : Admin::class;

        if (isset($data['recipient_type']) && $data['recipient_type'] === 'customer') {
            $data['recipient_type'] = Customer::class;
            $customer = Customer::find($data['recipient_id']);
            $data['recipient_id']  = $customer->id;
        }
        $message = Message::create($data);
        return new MessageResource($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if ($user->isCustomer()) {
            $chat = Customer::find($id);
            $messages = Message::where(function ($query) use ($id) {
                $query->where('sender_id', $id)
                    ->where('sender_type', Customer::class);
            })->orWhere(function ($query) use ($id) {
                $query->where('recipient_id', $id)
                    ->where('recipient_type', Customer::class);
            })->orderBy('created_at', 'asc')->get();

            return response()->json([
                'customer' => new CustomerResource($chat),
                'messages' => $messages,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
