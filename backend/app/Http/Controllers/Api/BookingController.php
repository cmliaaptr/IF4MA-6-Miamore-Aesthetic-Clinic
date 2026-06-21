<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Data booking berhasil diambil',
            'data' => Booking::with('pelanggan:id_user,username,email,role')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_user' => 'required|exists:users,id_user',
            'nama_lengkap' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string|max:20',
            'no_telephone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'alamat' => 'required|string',
            'tanggal_booking' => 'required|date|after_or_equal:today',
            'waktu_booking' => 'required|date_format:H:i',
            'treatment' => 'required|string|max:255',
            'dokter_terapis' => 'nullable|string|max:255',
            'catatan' => 'nullable|string',
            'total_pembayaran' => 'nullable|numeric|min:0',
            'metode_pembayaran' => 'nullable|string|max:50',
        ]);

        $pelanggan = User::where('id_user', $validated['id_user'])
            ->where('role', 'pelanggan')
            ->first();

        if (!$pelanggan) {
            return response()->json([
                'message' => 'User pelanggan tidak ditemukan',
            ], 422);
        }

        $booking = Booking::create([
            ...$validated,
            'order_id' => $this->generateOrderId(),
            'status_booking' => 'Booking',
            'status_pembayaran' => 'Belum Dibayar',
        ])->load('pelanggan:id_user,username,email,role');

        return response()->json([
            'message' => 'Booking berhasil dibuat',
            'data' => $booking,
        ], 201);
    }

    public function show($id)
    {
        $booking = Booking::with('pelanggan:id_user,username,email,role')->find($id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'data' => $booking,
        ]);
    }

    public function confirmPayment(Request $request, $id)
    {
        $validated = $request->validate([
            'metode_pembayaran' => 'required|string|max:50',
        ]);

        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan',
            ], 404);
        }

        $booking->update([
            'metode_pembayaran' => $validated['metode_pembayaran'],
            'status_booking' => 'Terkonfirmasi',
            'status_pembayaran' => 'Lunas',
        ]);

        return response()->json([
            'message' => 'Pembayaran berhasil dikonfirmasi',
            'data' => $booking->load('pelanggan:id_user,username,email,role'),
        ]);
    }

    private function generateOrderId(): string
    {
        do {
            $orderId = 'BKG-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
        } while (Booking::where('order_id', $orderId)->exists());

        return $orderId;
    }
}
