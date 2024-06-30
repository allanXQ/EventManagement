<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\BookingController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('events', [EventController::class, 'index']);
    Route::post('events', [EventController::class, 'store']);
    Route::get('events/{event}', [EventController::class, 'show']);
    Route::put('events/{event}', [EventController::class, 'update']);
    Route::delete('events/{event}', [EventController::class, 'destroy']);
});

Route::get('bookings', [BookingController::class, 'index']);
Route::post('bookings', [BookingController::class, 'store']);
Route::get('bookings/{booking}', [BookingController::class, 'show']);
Route::delete('bookings/{booking}', [BookingController::class, 'destroy']);

