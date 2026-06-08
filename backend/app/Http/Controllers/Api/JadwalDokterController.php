<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JadwalDokter;
use Illuminate\Http\Request;

class JadwalDokterController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Data jadwal dokter berhasil diambil',
            'data' => JadwalDokter::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_dokter' => 'required|string|max:255',
            'hari' => 'required|string|max:50',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
            'kapasitas' => 'required|integer',
        ]);

        $jadwal = JadwalDokter::create([
            'nama_dokter' => $request->nama_dokter,
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
        $jadwal = JadwalDokter::find($id);

        if (!$jadwal) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
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
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'nama_dokter' => 'required|string|max:255',
            'hari' => 'required|string|max:50',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
            'kapasitas' => 'required|integer',
        ]);

        $jadwal->update([
            'nama_dokter' => $request->nama_dokter,
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'kapasitas' => $request->kapasitas,
        ]);

        return response()->json([
            'message' => 'Jadwal dokter berhasil diubah',
            'data' => $jadwal
        ]);
    }

    public function destroy($id)
    {
        $jadwal = JadwalDokter::find($id);

        if (!$jadwal) {
            return response()->json([
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $jadwal->delete();

        return response()->json([
            'message' => 'Jadwal dokter berhasil dihapus'
        ]);
    }
}