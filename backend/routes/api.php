<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TreatmentController;
use App\Http\Controllers\Api\JadwalDokterController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\TreatmentResultController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/change-password', [AuthController::class, 'changePassword']);
Route::get('/dokter', [AuthController::class, 'getDoctors']);
Route::get('/pelanggan', [AuthController::class, 'getCustomers']);
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
Route::get('/admin/dashboard', [BookingController::class, 'adminDashboard']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/doctor', [BookingController::class, 'doctorIndex']);
Route::patch('/bookings/{id}/payment', [BookingController::class, 'confirmPayment']);
Route::get('/bookings/{id}/payment/status', [BookingController::class, 'paymentStatus']);
Route::post('/payments/midtrans/notification', [BookingController::class, 'midtransNotification']);
Route::get('/bookings/{id}', [BookingController::class, 'show']);
Route::get('/profile/{id}', [AuthController::class, 'profile']);
Route::put('/profile/{id}', [AuthController::class, 'updateProfile']);
Route::get('jadwal-dokter/dokter/{id}', [JadwalDokterController::class, 'JadwalDokter']);
Route::get('/treatment-results/doctor', [TreatmentResultController::class, 'doctorIndex']);
Route::post('/treatment-results', [TreatmentResultController::class, 'store']);
Route::get('/riwayat/customer/{idUser}', [TreatmentResultController::class, 'customerHistory']);
