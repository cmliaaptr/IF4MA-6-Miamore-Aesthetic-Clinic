<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';
    protected $primaryKey = 'id_pembayaran';
    protected $fillable = [
        'id_pembayaran',
        'id_booking',
        'total_bayar',
        'tanggal_bayar',
        'metode_bayar',
        'status'
    ];

    protected $casts = [
        'tanggal_bayar' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'id_booking', 'id_booking');
    }
}
