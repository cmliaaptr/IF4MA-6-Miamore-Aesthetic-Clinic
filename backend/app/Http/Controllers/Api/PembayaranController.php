<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    /**
     * Ambil semua pembayaran
     */
    public function index()
    {
        $pembayaran = Booking::with('pembayaran')
            ->whereNotNull('order_id')
            ->latest('id_booking')
            ->get()
            ->map(function (Booking $booking) {
                return [
                    'id_booking' => $booking->id_booking,
                    'id_pembayaran' => $booking->pembayaran?->id_pembayaran,
                    'order_id' => $booking->order_id,
                    'nama_lengkap' => $booking->nama_lengkap,
                    'treatment' => $booking->treatment,
                    'dokter_terapis' => $booking->dokter_terapis,
                    'tanggal_booking' => $booking->tanggal_booking,
                    'waktu_booking' => $booking->waktu_booking,
                    'total_pembayaran' => $booking->total_pembayaran,
                    'metode_pembayaran' => $booking->metode_pembayaran ?: 'QRIS',
                    'status_booking' => $booking->status_booking,
                    'status_pembayaran' => $booking->status_pembayaran,
                    'midtrans_transaction_id' => $booking->midtrans_transaction_id,
                    'midtrans_transaction_status' => $booking->midtrans_transaction_status,
                    'qris_url' => $booking->qris_url,
                    'payment_expires_at' => optional($booking->payment_expires_at)->toIso8601String(),
                    'paid_at' => optional($booking->paid_at)->toIso8601String(),
                    'tanggal_bayar' => optional($booking->pembayaran?->tanggal_bayar)->toIso8601String(),
                    'created_at' => optional($booking->created_at)->toIso8601String(),
                ];
            });

        return response()->json([
            'message' => 'Data pembayaran berhasil diambil',
            'data' => $pembayaran,
        ]);
    }

    /**
     * Simpan pembayaran
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_booking' => 'required|integer',
            'total_bayar' => 'required|numeric',
        ]);

        $pembayaran = Pembayaran::create([
            'id_booking'   => $request->id_booking,
            'total_bayar' => $request->total_bayar,
            'tanggal_bayar' => now(),
            'metode_bayar' => 'QRIS',
            'status'       => 'Lunas',
        ]);

        return response()->json([
            'message' => 'Pembayaran berhasil ditambahkan',
            'data' => $pembayaran
        ], 201);
    }

    /**
     * Detail pembayaran
     */
    public function show($id)
    {
        $pembayaran = Pembayaran::with('booking')
            ->find($id);

        if (!$pembayaran) {
            return response()->json([
                'message' => 'Data pembayaran tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $pembayaran
        ]);
    }

    /**
     * Update status pembayaran
     */
    public function update(Request $request, $id)
    {
        $pembayaran = Pembayaran::find($id);

        if (!$pembayaran) {
            return response()->json([
                'message' => 'Data pembayaran tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'status' => 'required|string'
        ]);

        $pembayaran->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Status pembayaran berhasil diupdate',
            'data' => $pembayaran
        ]);
    }

    /**
     * Hapus pembayaran
     */
    public function destroy($id)
    {
        $pembayaran = Pembayaran::find($id);

        if (!$pembayaran) {
            return response()->json([
                'message' => 'Data pembayaran tidak ditemukan'
            ], 404);
        }

        $pembayaran->delete();

        return response()->json([
            'message' => 'Data pembayaran berhasil dihapus'
        ]);
    }
}
