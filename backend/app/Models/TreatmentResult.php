<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TreatmentResult extends Model
{
    protected $table = 'treatment_results';

    protected $primaryKey = 'id_treatment_result';

    protected $fillable = [
        'id_booking',
        'id_dokter',
        'submitted_by',
        'kondisi_kulit',
        'skin_condition',
        'hasil_treatment',
        'treatment_result',
        'rekomendasi',
        'recommendation',
        'home_care',
        'catatan_kontrol',
        'control_note',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'id_booking', 'id_booking');
    }

    public function dokter()
    {
        return $this->belongsTo(User::class, 'submitted_by', 'id_user');
    }
}
