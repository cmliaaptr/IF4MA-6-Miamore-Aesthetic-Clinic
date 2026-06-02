<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JadwalDokter;
use Illuminate\Http\Request;

class JadwalDokterController extends Controller
{
    public function index()
    {
        $jadwal = JadwalDokter::with('dokter')
            ->get();

        return response()->json([
            'message' => 'Data jadwal dokter berhasil diambil',
            'data' => $jadwal
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_dokter' => 'required',
            'hari' => 'required',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
            'kapasitas' => 'required'
        ]);

        $jadwal = JadwalDokter::create([
            'id_dokter' => $request->id_dokter,
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'kapasitas' => $request->kapasitas,
        ]);

        return response()->json([
            'message' => 'Jadwal dokter berhasil ditambahkan',
            'data' => $jadwal
        ], 201);
    }

    public function show($id)
    {
        $jadwal = JadwalDokter::with('dokter')
            ->find($id);

        if (!$jadwal) {
            return response()->json([
                'message' => 'Jadwal tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $jadwal
        ]);
    }

    public function update(Request $request, $id)
    {
        $jadwal = JadwalDokter::find($id);

        if (!$jadwal) {
            return response()->json([
                'message' => 'Jadwal tidak ditemukan'
            ], 404);
        }

        $jadwal->update([
            'id_dokter' => $request->id_dokter,
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'kapasitas' => $request->kapasitas,
        ]);

        return response()->json([
            'message' => 'Jadwal dokter berhasil diupdate',
            'data' => $jadwal
        ]);
    }

    public function destroy($id)
    {
        $jadwal = JadwalDokter::find($id);

        if (!$jadwal) {
            return response()->json([
                'message' => 'Jadwal tidak ditemukan'
            ], 404);
        }

        $jadwal->delete();

        return response()->json([
            'message' => 'Jadwal dokter berhasil dihapus'
        ]);
    }
}