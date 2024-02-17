<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
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
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'), 201);
    }
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        if (!auth()->attempt($data)) {
            return response(['message' => 'Invalid credentials. Please try again.', 'status' => 'error'], 201);
        }
        /** @var user $user */
        $user = auth()->user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'), 201);
    }
    public function logout(Request $request)
    {
        /** @var user $user */
        $user = $request->user();
        $user->tokens()->delete();
        return response(['message' => 'Logged out successfully'], 200);
    }
}
