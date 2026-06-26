<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Pembayaran;
use App\Models\User;
use App\Services\MidtransQrisService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Throwable;

class BookingController extends Controller
{
    public function __construct(private MidtransQrisService $midtransQris)
    {
    }

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
            'metode_pembayaran' => 'QRIS',
            'payment_expires_at' => now()->addMinutes(15),
        ])->load('pelanggan:id_user,username,email,role');

        $payment = null;
        $paymentWarning = null;

        try {
            $charge = $this->midtransQris->createCharge($booking);
            $booking->update([
                'midtrans_transaction_id' => $charge['transaction_id'] ?? null,
                'midtrans_transaction_status' => $charge['transaction_status'] ?? 'pending',
                'qris_url' => $this->midtransQris->qrCodeUrl($charge),
            ]);

            $payment = $this->paymentPayload($booking->fresh());
        } catch (Throwable $error) {
            report($error);
            $paymentWarning = 'QRIS otomatis belum dapat dibuat. Periksa konfigurasi Midtrans.';
        }

        return response()->json([
            'message' => 'Booking berhasil dibuat',
            'data' => $booking->fresh('pelanggan:id_user,username,email,role'),
            'payment' => $payment,
            'payment_warning' => $paymentWarning,
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
            'payment' => $this->paymentPayload($booking),
        ]);
    }

    public function confirmPayment(Request $request, $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan',
            ], 404);
        }

        try {
            $status = $this->midtransQris->getStatus($booking->order_id);
        } catch (Throwable $error) {
            report($error);

            return response()->json([
                'message' => 'Status pembayaran belum dapat dicek ke Midtrans.',
                'data' => $booking->load('pelanggan:id_user,username,email,role'),
                'payment' => $this->paymentPayload($booking),
            ], 502);
        }

        $this->syncPaymentStatus($booking, $status);

        return response()->json([
            'message' => $booking->fresh()->status_pembayaran === 'Lunas'
                ? 'Pembayaran berhasil dikonfirmasi'
                : 'Pembayaran masih menunggu verifikasi',
            'data' => $booking->fresh('pelanggan:id_user,username,email,role'),
            'payment' => $this->paymentPayload($booking->fresh()),
        ]);
    }

    public function paymentStatus($id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan',
            ], 404);
        }

        if ($booking->status_pembayaran !== 'Lunas' && $this->midtransQris->isConfigured()) {
            try {
                $status = $this->midtransQris->getStatus($booking->order_id);
                $this->syncPaymentStatus($booking, $status);
            } catch (Throwable $error) {
                report($error);
            }
        }

        $booking = $booking->fresh();

        return response()->json([
            'data' => $booking,
            'payment' => $this->paymentPayload($booking),
        ]);
    }

    public function midtransNotification(Request $request)
    {
        $payload = $request->all();

        if (!$this->midtransQris->verifySignature($payload)) {
            return response()->json([
                'message' => 'Signature Midtrans tidak valid',
            ], 403);
        }

        $booking = Booking::where('order_id', $payload['order_id'] ?? null)->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan',
            ], 404);
        }

        $this->syncPaymentStatus($booking, $payload);

        return response()->json([
            'message' => 'Notifikasi pembayaran diterima',
        ]);
    }

    private function generateOrderId(): string
    {
        do {
            $orderId = 'BKG-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
        } while (Booking::where('order_id', $orderId)->exists());

        return $orderId;
    }

    private function syncPaymentStatus(Booking $booking, array $payload): void
    {
        $transactionStatus = $payload['transaction_status'] ?? null;

        $updates = [
            'midtrans_transaction_id' => $payload['transaction_id'] ?? $booking->midtrans_transaction_id,
            'midtrans_transaction_status' => $transactionStatus ?? $booking->midtrans_transaction_status,
            'metode_pembayaran' => 'QRIS',
        ];

        if ($this->midtransQris->isSuccessfulStatus($payload)) {
            $updates['status_booking'] = 'Terkonfirmasi';
            $updates['status_pembayaran'] = 'Lunas';
            $updates['paid_at'] = $booking->paid_at ?: now();

            Pembayaran::updateOrCreate(
                ['id_booking' => $booking->id_booking],
                [
                    'total_bayar' => $booking->total_pembayaran ?: ($payload['gross_amount'] ?? 0),
                    'tanggal_bayar' => now(),
                    'metode_bayar' => 'QRIS',
                    'status' => 'Lunas',
                ]
            );
        }

        if ($this->midtransQris->isFailedStatus($payload)) {
            $updates['status_pembayaran'] = 'Gagal';
        }

        $booking->update($updates);
    }

    private function paymentPayload(?Booking $booking): ?array
    {
        if (!$booking) {
            return null;
        }

        return [
            'order_id' => $booking->order_id,
            'transaction_id' => $booking->midtrans_transaction_id,
            'transaction_status' => $booking->midtrans_transaction_status,
            'qris_url' => $booking->qris_url,
            'status_pembayaran' => $booking->status_pembayaran,
            'expires_at' => optional($booking->payment_expires_at)->toIso8601String(),
            'paid_at' => optional($booking->paid_at)->toIso8601String(),
        ];
    }
}
