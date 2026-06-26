<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'bookings';

    protected $primaryKey = 'id_booking';

    protected $fillable = [
        'id_user',
        'order_id',
        'nama_lengkap',
        'tanggal_lahir',
        'jenis_kelamin',
        'no_telephone',
        'email',
        'alamat',
        'tanggal_booking',
        'waktu_booking',
        'treatment',
        'dokter_terapis',
        'catatan',
        'total_pembayaran',
        'metode_pembayaran',
        'midtrans_transaction_id',
        'midtrans_transaction_status',
        'qris_url',
        'payment_expires_at',
        'paid_at',
        'status_booking',
        'status_pembayaran',
    ];

    protected $casts = [
        'payment_expires_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    public function pelanggan()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function treatmentResult()
    {
        return $this->hasOne(TreatmentResult::class, 'id_booking', 'id_booking');
    }
}
