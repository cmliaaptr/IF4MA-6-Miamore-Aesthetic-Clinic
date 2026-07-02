<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'harga' => 'required|numeric',
            'diskon' => 'nullable|numeric',
            'durasi' => 'required|string|max:100',
        ]);

        $fotoUrl = $this->storePhoto($request);

        $treatment = Treatment::create([
            'nama_treatment' => $request->nama_treatment,
            'deskripsi' => $request->deskripsi,
            'foto' => $fotoUrl,
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
            'durasi' => 'required|string|max:100',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'diskon' => 'nullable|numeric',
        ]);

        $fotoUrl = $request->hasFile('foto')
            ? $this->storePhoto($request, $treatment)
            : $treatment->foto;

        $treatment->update([
            'nama_treatment' => $request->nama_treatment,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'durasi' => $request->durasi,
            'foto' => $fotoUrl,
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

    private function storePhoto(Request $request, ?Treatment $existingTreatment = null): ?string
    {
        if (!$request->hasFile('foto')) {
            return null;
        }

        if ($existingTreatment?->foto) {
            $oldPath = parse_url($existingTreatment->foto, PHP_URL_PATH);
            $oldPath = $oldPath ? str_replace('/storage/', '', $oldPath) : null;

            if ($oldPath) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $path = $request->file('foto')->store('treatments', 'public');

        return $request->getSchemeAndHttpHost() . Storage::disk('public')->url($path);
    }
}
