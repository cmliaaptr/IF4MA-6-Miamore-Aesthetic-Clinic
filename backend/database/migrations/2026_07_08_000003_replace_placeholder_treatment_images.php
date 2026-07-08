<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $imagesByTreatment = [
            'Facial Cleaning' => '/images/brightening.jpg',
            'Chemical Peel' => '/images/co2 fractional.jpg',
            'Microdermabrasion' => '/images/acne.jpg',
            'Laser Treatment' => '/images/flek.jpg',
            'Botox Injection' => '/images/anti-aging.jpeg',
        ];

        foreach ($imagesByTreatment as $treatmentName => $imagePath) {
            DB::table('treatments')
                ->where('nama_treatment', $treatmentName)
                ->where(function ($query) {
                    $query->whereNull('foto')
                        ->orWhere('foto', '')
                        ->orWhere('foto', 'https://via.placeholder.com/300');
                })
                ->update(['foto' => $imagePath]);
        }
    }

    public function down(): void
    {
        DB::table('treatments')
            ->whereIn('nama_treatment', [
                'Facial Cleaning',
                'Chemical Peel',
                'Microdermabrasion',
                'Laser Treatment',
                'Botox Injection',
            ])
            ->whereIn('foto', [
                '/images/brightening.jpg',
                '/images/co2 fractional.jpg',
                '/images/acne.jpg',
                '/images/flek.jpg',
                '/images/anti-aging.jpeg',
            ])
            ->update(['foto' => null]);
    }
};
