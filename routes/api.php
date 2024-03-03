<?php

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\LaundryController;
use App\Http\Controllers\Api\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('jwt.auth')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        if ($request['_role'] == 'admin') {
            $user->load('admin');
        } {
            $user->load('customer');
        }
        return new UserResource($user);
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/users/{user}', [UserController::class, 'update']);

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/laundries', LaundryController::class);
    Route::apiResource('/bookings', BookingController::class);
    Route::apiResource('/messages', MessageController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
