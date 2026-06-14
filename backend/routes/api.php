<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TreatmentController;
use App\Http\Controllers\Api\JadwalDokterController;
use App\Http\Controllers\Api\BookingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/treatments', [TreatmentController::class, 'index']);
Route::post('/treatments', [TreatmentController::class, 'store']);
Route::get('/treatments/{id}', [TreatmentController::class, 'show']);
Route::put('/treatments/{id}', [TreatmentController::class, 'update']);
Route::delete('/treatments/{id}', [TreatmentController::class, 'destroy']);
Route::get('/jadwal-dokter', [JadwalDokterController::class, 'index']);
Route::post('/jadwal-dokter', [JadwalDokterController::class, 'store']);
Route::get('/jadwal-dokter/{id}', [JadwalDokterController::class, 'show']);
Route::put('/jadwal-dokter/{id}', [JadwalDokterController::class, 'update']);
Route::delete('/jadwal-dokter/{id}', [JadwalDokterController::class, 'destroy']);
Route::get('/dokter', [AuthController::class, 'getDoctors']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/{id}', [BookingController::class, 'show']);
