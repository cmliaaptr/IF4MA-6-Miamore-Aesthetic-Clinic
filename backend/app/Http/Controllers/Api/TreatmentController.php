<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Treatment;
use Illuminate\Http\Request;

class TreatmentController extends Controller
{
    /**
     * Menampilkan semua treatment
     */
    public function index()
    {
        $treatments = Treatment::all();

        return response()->json([
            'message' => 'Data treatment berhasil diambil',
            'data' => $treatments
        ]);
    }

    /**
     * Menambahkan treatment baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_treatment' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|string',
            'harga' => 'required|numeric',
            'diskon' => 'nullable|numeric',
            'durasi' => 'required|integer',
        ]);

        $treatment = Treatment::create([
            'nama_treatment' => $request->nama_treatment,
            'deskripsi' => $request->deskripsi,
            'foto' => $request->foto,
            'harga' => $request->harga,
            'diskon' => $request->diskon,
            'durasi' => $request->durasi,
        ]);

        return response()->json([
            'message' => 'Treatment berhasil ditambahkan',
            'data' => $treatment
        ], 201);
    }

    /**
     * Menampilkan detail treatment
     */
    public function show($id)
    {
        $treatment = Treatment::find($id);

        if (!$treatment) {
            return response()->json([
                'message' => 'Treatment tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $treatment
        ]);
    }

    /**
     * Update treatment
     */
    public function update(Request $request, $id)
    {
        $treatment = Treatment::find($id);

        if (!$treatment) {
            return response()->json([
                'message' => 'Treatment tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'nama_treatment' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|numeric',
            'durasi' => 'required|integer',
            'foto' => 'nullable|string',
            'diskon' => 'nullable|numeric',
        ]);

        $treatment->update([
            'nama_treatment' => $request->nama_treatment,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'durasi' => $request->durasi,
            'foto' => $request->foto,
            'diskon' => $request->diskon,
        ]);

        return response()->json([
            'message' => 'Treatment berhasil diupdate',
            'data' => $treatment
        ]);
    }

    /**
     * Hapus treatment
     */
    public function destroy($id)
    {
        $treatment = Treatment::find($id);

        if (!$treatment) {
            return response()->json([
                'message' => 'Treatment tidak ditemukan'
            ], 404);
        }

        $treatment->delete();

        return response()->json([
            'message' => 'Treatment berhasil dihapus'
        ]);
    }
}