<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;

class AuthController extends Controller
{

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var user $user */
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        /** @var User $user */
        $token = JWTAuth::fromUser($user);
        return response(compact('user', 'token'), 201);
    }
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        if (!auth()->attempt($data)) {
            return response(['message' => 'Invalid credentials. Please try again.', 'status' => 'error'], 422);
        }
        $user = auth()->user();
        if ($request['role'] === 'admin') {
            $user->load('admin');
            $user->setRole('admin');
        } else {
            $user->load('customer');
        }

        /** @var User $user */
        $token = JWTAuth::fromUser($user);
        return response(compact('user', 'token'), 201);
    }
    public function logout(Request $request)
    {
        /** @var user $user */
        // $user = $request->user();
        // $user->tokens()->delete();
        JWTAuth::invalidate(JWTAuth::getToken());
        return response(['message' => 'Logged out successfully'], 200);
    }
}
