<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalDokter extends Model
{
    protected $table = 'jadwal_dokter';

    protected $primaryKey = 'id_jadwal';

    protected $fillable = [
        'id_dokter',
        'hari',
        'jam_mulai',
        'jam_selesai',
        'kapasitas',
    ];

    public function dokter()
    {
        return $this->belongsTo(
            User::class,
            'id_dokter',
            'id_user'
        );
    }
}