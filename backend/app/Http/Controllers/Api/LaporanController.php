<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with('pelanggan:id_user,username,email,role')
            ->latest();

        if ($request->tanggal) {
            $query->whereDate(
                'tanggal_booking',
                $request->tanggal
            );
        }

        $bookings = $query->get();

        return response()->json([
            'message' => 'Data laporan berhasil diambil',
            'data' => $bookings
                ->map(fn ($booking) => $this->formatReportBooking($booking))
                ->values(),
            'total_booking' => $bookings->count()
        ]);
    }

    public function exportPdf(Request $request)
    {
        $query = Booking::query()->latest();

        if ($request->tanggal) {
            $query->whereDate(
                'tanggal_booking',
                $request->tanggal
            );
        }

        $booking = $query->get();

        $pdf = Pdf::loadView(
            'laporan.booking',
            [
                'booking' => $booking,
                'tanggal' => $request->tanggal,
            ]
        );

        return $pdf->download(
            'laporan-booking.pdf'
        );
    }

    private function formatReportBooking(Booking $booking): array
    {
        return [
            'id' => $booking->id_booking,
            'fullName' => $booking->nama_lengkap,
            'customerName' => optional($booking->pelanggan)->username,
            'treatment' => $booking->treatment,
            'doctor' => $booking->dokter_terapis,
            'date' => $booking->tanggal_booking
                ? Carbon::parse($booking->tanggal_booking)->format('d/m/Y')
                : '-',
            'time' => substr((string) $booking->waktu_booking, 0, 5),
            'status' => $this->reportBookingStatus($booking),
            'status_booking' => $booking->status_booking,
            'status_pembayaran' => $booking->status_pembayaran,
        ];
    }

    private function reportBookingStatus(Booking $booking): string
    {
        if ($booking->status_booking === 'Terkonfirmasi' || $booking->status_booking === 'Selesai') {
            return 'Konfirmasi';
        }

        if ($booking->status_pembayaran === 'Belum Dibayar' || $booking->status_pembayaran === 'Gagal') {
            return 'Tertunda';
        }

        return 'Booking';
    }
}
