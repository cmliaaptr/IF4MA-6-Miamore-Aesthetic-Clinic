<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    protected $table = 'treatments';

    protected $primaryKey = 'id_treatment';

    protected $fillable = [
        'nama_treatment',
        'deskripsi',
        'foto',
        'harga',
        'diskon',
        'durasi',
    ];
}