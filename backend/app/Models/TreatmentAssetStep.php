<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TreatmentAssetStep extends Model
{
    protected $table = 'treatment_asset_steps';

    protected $primaryKey = 'id_treatment_asset_step';

    protected $fillable = [
        'id_treatment_asset',
        'nama_langkah',
        'produk',
        'takaran',
        'durasi',
        'cara_penggunaan',
        'urutan',
    ];
}
