<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Treatment;
use App\Models\TreatmentAsset;
use App\Models\TreatmentAssetStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TreatmentController extends Controller
{
    /**
     * Menampilkan semua treatment
     */
    public function index()
    {
        $treatments = Treatment::latest()->get();

        return response()->json([
            'message' => 'Data treatment berhasil diambil',
            'data' => $treatments
        ]);
    }

    public function assetIndex()
    {
        $treatments = TreatmentAsset::with('steps')->latest()->get();

        return response()->json([
            'message' => 'Data aset treatment berhasil diambil',
            'data' => $treatments->map(fn (TreatmentAsset $treatment) => $this->assetPayload($treatment)),
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

    public function storeAsset(Request $request)
    {
        $validated = $request->validate([
            'nama_treatment' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|string|max:2048',
            'harga' => 'nullable|numeric',
            'diskon' => 'nullable|numeric',
            'durasi' => 'required|string|max:100',
            'status' => 'required|in:Aktif,Nonaktif',
        ]);

        $treatment = TreatmentAsset::create([
            'nama_treatment' => $validated['nama_treatment'],
            'kategori' => $validated['kategori'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'foto' => $validated['foto'] ?? null,
            'durasi' => $validated['durasi'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Aset treatment berhasil ditambahkan',
            'data' => $this->assetPayload($treatment->load('steps')),
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

    public function updateAsset(Request $request, $id)
    {
        $treatment = TreatmentAsset::find($id);

        if (!$treatment) {
            return response()->json([
                'message' => 'Aset treatment tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'nama_treatment' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|string|max:2048',
            'durasi' => 'required|string|max:100',
            'status' => 'required|in:Aktif,Nonaktif',
        ]);

        $treatment->update([
            'nama_treatment' => $validated['nama_treatment'],
            'kategori' => $validated['kategori'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'foto' => $validated['foto'] ?? null,
            'durasi' => $validated['durasi'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Aset treatment berhasil diperbarui',
            'data' => $this->assetPayload($treatment->load('steps')),
        ]);
    }

    public function updateAssetSteps(Request $request, $id)
    {
        $treatment = TreatmentAsset::find($id);

        if (!$treatment) {
            return response()->json([
                'message' => 'Aset treatment tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'steps' => 'required|array',
            'steps.*.nama_langkah' => 'required|string|max:255',
            'steps.*.produk' => 'required|string|max:255',
            'steps.*.takaran' => 'required|string|max:255',
            'steps.*.durasi' => 'nullable|string|max:100',
            'steps.*.cara_penggunaan' => 'nullable|string',
        ]);

        $treatment->steps()->delete();

        foreach ($validated['steps'] as $index => $step) {
            TreatmentAssetStep::create([
                'id_treatment_asset' => $treatment->id_treatment_asset,
                'nama_langkah' => $step['nama_langkah'],
                'produk' => $step['produk'],
                'takaran' => $step['takaran'],
                'durasi' => $step['durasi'] ?? null,
                'cara_penggunaan' => $step['cara_penggunaan'] ?? null,
                'urutan' => $index + 1,
            ]);
        }

        return response()->json([
            'message' => 'Langkah dan takaran aset treatment berhasil diperbarui',
            'data' => $this->assetPayload($treatment->fresh('steps')),
        ]);
    }

    public function destroyAsset($id)
    {
        $treatment = TreatmentAsset::find($id);

        if (!$treatment) {
            return response()->json([
                'message' => 'Aset treatment tidak ditemukan',
            ], 404);
        }

        $treatment->delete();

        return response()->json([
            'message' => 'Aset treatment berhasil dihapus',
        ]);
    }

    private function assetPayload(TreatmentAsset $treatment): array
    {
        return [
            'id_treatment_asset' => $treatment->id_treatment_asset,
            'nama_treatment' => $treatment->nama_treatment,
            'kategori' => $treatment->kategori,
            'deskripsi' => $treatment->deskripsi,
            'foto' => $treatment->foto,
            'durasi' => $treatment->durasi,
            'status' => $treatment->status,
            'created_at' => optional($treatment->created_at)->toIso8601String(),
            'updated_at' => optional($treatment->updated_at)->toIso8601String(),
            'steps' => $treatment->steps->map(fn (TreatmentAssetStep $step) => [
                'id_treatment_asset_step' => $step->id_treatment_asset_step,
                'nama_langkah' => $step->nama_langkah,
                'produk' => $step->produk,
                'takaran' => $step->takaran,
                'durasi' => $step->durasi,
                'cara_penggunaan' => $step->cara_penggunaan,
                'urutan' => $step->urutan,
            ])->values(),
        ];
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
