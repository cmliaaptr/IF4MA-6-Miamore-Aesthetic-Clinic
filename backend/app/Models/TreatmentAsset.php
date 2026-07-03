<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TreatmentAsset extends Model
{
    protected $table = 'treatment_assets';

    protected $primaryKey = 'id_treatment_asset';

    protected $fillable = [
        'nama_treatment',
        'kategori',
        'deskripsi',
        'foto',
        'durasi',
        'status',
    ];

    public function steps(): HasMany
    {
        return $this->hasMany(TreatmentAssetStep::class, 'id_treatment_asset', 'id_treatment_asset')
            ->orderBy('urutan')
            ->orderBy('id_treatment_asset_step');
    }
}
