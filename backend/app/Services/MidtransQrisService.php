<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class MidtransQrisService
{
    public function createCharge(Booking $booking): array
    {
        $amount = (int) round((float) ($booking->total_pembayaran ?: 0));

        if ($amount <= 0) {
            throw new RuntimeException('Total pembayaran tidak valid.');
        }

        $response = $this->client()
            ->post($this->baseUrl() . '/v2/charge', [
                'payment_type' => 'qris',
                'transaction_details' => [
                    'order_id' => $booking->order_id,
                    'gross_amount' => $amount,
                ],
                'item_details' => [
                    [
                        'id' => 'BOOKING-' . $booking->id_booking,
                        'price' => $amount,
                        'quantity' => 1,
                        'name' => mb_substr($booking->treatment, 0, 50),
                    ],
                ],
                'customer_details' => [
                    'first_name' => $booking->nama_lengkap,
                    'email' => $booking->email,
                    'phone' => $booking->no_telephone,
                ],
                'qris' => [
                    'acquirer' => config('services.midtrans.qris_acquirer', 'gopay'),
                ],
            ]);

        $response->throw();

        return $response->json();
    }

    public function getStatus(string $orderId): array
    {
        $response = $this->client()->get($this->baseUrl() . "/v2/{$orderId}/status");
        $response->throw();

        return $response->json();
    }

    public function verifySignature(array $payload): bool
    {
        $signature = $payload['signature_key'] ?? null;

        if (!$signature) {
            return false;
        }

        $expected = hash(
            'sha512',
            ($payload['order_id'] ?? '') .
                ($payload['status_code'] ?? '') .
                ($payload['gross_amount'] ?? '') .
                $this->serverKey()
        );

        return hash_equals($expected, $signature);
    }

    public function isConfigured(): bool
    {
        return $this->serverKey() !== '';
    }

    public function isProduction(): bool
    {
        return (bool) config('services.midtrans.is_production');
    }

    public function qrCodeUrl(array $charge): ?string
    {
        $actions = $charge['actions'] ?? [];
        $preferredAction = collect($actions)->firstWhere('name', 'generate-qr-code-v2')
            ?: collect($actions)->firstWhere('name', 'generate-qr-code');

        return $preferredAction['url'] ?? null;
    }

    public function isSuccessfulStatus(array $payload): bool
    {
        $status = strtolower((string) ($payload['transaction_status'] ?? ''));
        $fraudStatus = strtolower((string) ($payload['fraud_status'] ?? 'accept'));
        $statusCode = (string) ($payload['status_code'] ?? '');

        return in_array($status, ['capture', 'settlement'], true)
            && in_array($fraudStatus, ['accept', ''], true)
            && ($statusCode === '' || $statusCode === '200');
    }

    public function isFailedStatus(array $payload): bool
    {
        $status = strtolower((string) ($payload['transaction_status'] ?? ''));

        return in_array($status, [
            'cancel',
            'deny',
            'expire',
            'failure',
            'refund',
            'partial_refund',
            'chargeback',
            'partial_chargeback',
        ], true);
    }

    private function client()
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('MIDTRANS_SERVER_KEY belum diatur.');
        }

        return Http::withBasicAuth($this->serverKey(), '')
            ->acceptJson()
            ->asJson()
            ->connectTimeout(8)
            ->timeout(20)
            ->retry(2, 500);
    }

    private function baseUrl(): string
    {
        return config('services.midtrans.is_production')
            ? 'https://api.midtrans.com'
            : 'https://api.sandbox.midtrans.com';
    }

    private function serverKey(): string
    {
        return (string) config('services.midtrans.server_key', '');
    }
}
