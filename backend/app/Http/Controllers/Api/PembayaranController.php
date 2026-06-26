<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    /**
     * Ambil semua pembayaran
     */
    public function index()
    {
        return response()->json([
            'message' => 'Data pembayaran berhasil diambil',
            'data' => Pembayaran::with('booking')->get()
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