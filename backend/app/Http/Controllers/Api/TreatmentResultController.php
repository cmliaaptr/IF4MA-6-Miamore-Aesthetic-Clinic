<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Treatment;
use App\Models\TreatmentResult;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class TreatmentResultController extends Controller
{
    public function doctorIndex(Request $request)
    {
        $doctorName = $request->query('doctor_name');

        $bookings = Booking::with('treatmentResult')
            ->when($doctorName, function ($query) use ($doctorName) {
                $query->where('dokter_terapis', $doctorName);
            })
            ->where('status_pembayaran', 'Lunas')
            ->whereIn('status_booking', ['Terkonfirmasi', 'Selesai'])
            ->orderBy('tanggal_booking')
            ->orderBy('waktu_booking')
            ->get();

        $sentCount = $bookings->filter(fn ($booking) => $booking->treatmentResult !== null)->count();

        return response()->json([
            'message' => 'Data hasil treatment dokter berhasil diambil',
            'summary' => [
                'treatment_selesai' => $bookings->count(),
                'hasil_terkirim' => $sentCount,
                'belum_diisi' => $bookings->count() - $sentCount,
            ],
            'data' => $bookings->map(fn ($booking) => $this->formatDoctorBooking($booking))->values(),
        ]);
    }

    public function customerHistory($idUser)
    {
        $bookings = Booking::with('treatmentResult')
            ->where('id_user', $idUser)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data riwayat customer berhasil diambil',
            'data' => $bookings->map(fn ($booking) => $this->formatCustomerHistory($booking))->values(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_booking' => 'required|exists:bookings,id_booking',
            'submitted_by' => 'nullable|exists:users,id_user',
            'skin_condition' => 'required|string',
            'treatment_result' => 'required|string',
            'recommendation' => 'required|string',
            'home_care' => 'required|string',
            'control_note' => 'required|string',
        ]);

        $booking = Booking::find($validated['id_booking']);

        if (!$booking || $booking->status_pembayaran !== 'Lunas') {
            return response()->json([
                'message' => 'Hasil treatment hanya bisa dikirim untuk booking yang sudah lunas',
            ], 422);
        }

        $result = TreatmentResult::updateOrCreate(
            ['id_booking' => $validated['id_booking']],
            $this->buildResultPayload($validated)
        );

        return response()->json([
            'message' => 'Hasil treatment berhasil dikirim ke riwayat customer',
            'data' => $result->load('booking'),
        ], 201);
    }

    private function formatDoctorBooking(Booking $booking): array
    {
        return [
            'id' => $booking->id_booking,
            'id_booking' => $booking->id_booking,
            'id_user' => $booking->id_user,
            'name' => $booking->nama_lengkap,
            'treatment' => $booking->treatment,
            'schedule' => $this->formatSchedule($booking),
            'room' => 'Ruang Treatment',
            'payment' => $booking->status_pembayaran,
            'status' => 'Selesai',
            'result' => $this->formatResult($booking->treatmentResult),
        ];
    }

    private function formatCustomerHistory(Booking $booking): array
    {
        $result = $booking->treatmentResult;
        $formattedResult = $this->formatResult($result);
        $treatment = $this->findTreatment($booking->treatment);
        $treatmentName = $treatment?->nama_treatment ?: ($booking->treatment ?: 'Treatment Miamore');
        $status = match ($booking->status_booking) {
            'Dibatalkan' => 'Dibatalkan',
            'Terkonfirmasi', 'Selesai' => 'Selesai',
            default => 'Akan Datang',
        };

        return [
            'id' => $booking->id_booking,
            'treatment' => $treatmentName,
            'treatmentImage' => $treatment?->foto,
            'treatmentDescription' => $treatment?->deskripsi,
            'treatmentPrice' => $this->formatRupiah($treatment?->harga),
            'treatmentDuration' => $treatment?->durasi,
            'schedule' => $this->formatSchedule($booking),
            'doctor' => $booking->dokter_terapis ?: '-',
            'status' => $status,
            'room' => 'Ruang Treatment',
            'payment' => $booking->status_pembayaran,
            'detailTitle' => $result ? 'Hasil Treatment' : 'Detail Booking',
            'detailItems' => $formattedResult ? [
                $formattedResult['skinCondition'],
                $formattedResult['treatmentResult'],
                $formattedResult['recommendation'],
                $formattedResult['homeCare'],
            ] : [
                'Treatment: ' . $treatmentName,
                'Jadwal: ' . $this->formatSchedule($booking),
                'Status pembayaran: ' . $booking->status_pembayaran,
            ],
            'note' => $result
                ? $formattedResult['controlNote']
                : ($booking->catatan ?: 'Silakan cek kembali setelah treatment selesai.'),
            'result' => $formattedResult,
        ];
    }

    private function formatResult(?TreatmentResult $result): ?array
    {
        if (!$result) {
            return null;
        }

        return [
            'id_treatment_result' => $result->id_treatment_result,
            'skinCondition' => $result->getAttribute('skin_condition') ?: $result->getAttribute('kondisi_kulit'),
            'treatmentResult' => $result->getAttribute('treatment_result') ?: $result->getAttribute('hasil_treatment'),
            'recommendation' => $result->getAttribute('recommendation') ?: $result->getAttribute('rekomendasi'),
            'homeCare' => $result->home_care,
            'controlNote' => $result->getAttribute('control_note') ?: $result->getAttribute('catatan_kontrol'),
            'submittedAt' => optional($result->submitted_at)->format('d M Y, H:i'),
        ];
    }

    private function buildResultPayload(array $validated): array
    {
        $payload = [
            'submitted_by' => $validated['submitted_by'] ?? null,
            'skin_condition' => $validated['skin_condition'],
            'treatment_result' => $validated['treatment_result'],
            'recommendation' => $validated['recommendation'],
            'home_care' => $validated['home_care'],
            'control_note' => $validated['control_note'],
            'submitted_at' => now(),
        ];

        if (Schema::hasColumn('treatment_results', 'id_dokter')) {
            $payload['id_dokter'] = $validated['submitted_by'] ?? null;
        }

        if (Schema::hasColumn('treatment_results', 'kondisi_kulit')) {
            $payload['kondisi_kulit'] = $validated['skin_condition'];
        }

        if (Schema::hasColumn('treatment_results', 'hasil_treatment')) {
            $payload['hasil_treatment'] = $validated['treatment_result'];
        }

        if (Schema::hasColumn('treatment_results', 'rekomendasi')) {
            $payload['rekomendasi'] = $validated['recommendation'];
        }

        if (Schema::hasColumn('treatment_results', 'catatan_kontrol')) {
            $payload['catatan_kontrol'] = $validated['control_note'];
        }

        return $payload;
    }

    private function formatSchedule(Booking $booking): string
    {
        $date = $booking->tanggal_booking
            ? Carbon::parse($booking->tanggal_booking)->locale('id')->translatedFormat('d M Y')
            : '-';
        $time = substr((string) $booking->waktu_booking, 0, 5);

        return trim($date . ', ' . $time . ' WIB');
    }

    private function findTreatment(?string $treatmentName): ?Treatment
    {
        if (!$treatmentName) {
            return null;
        }

        $cleanName = trim(preg_replace('/\s+-\s+Rp\.?\s*[\d.]+.*$/i', '', $treatmentName));

        return Treatment::where('nama_treatment', $treatmentName)
            ->orWhere('nama_treatment', $cleanName)
            ->first();
    }

    private function formatRupiah(mixed $amount): ?string
    {
        if ($amount === null || $amount === '') {
            return null;
        }

        $numericAmount = (float) $amount;

        if ($numericAmount <= 0) {
            return null;
        }

        return 'Rp ' . number_format($numericAmount, 0, ',', '.');
    }
}
