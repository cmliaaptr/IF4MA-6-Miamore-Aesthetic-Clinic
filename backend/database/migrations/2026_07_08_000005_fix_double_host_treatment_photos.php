<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $treatments = DB::table('treatments')
            ->where('foto', 'like', '%http://127.0.0.1:8000http://127.0.0.1:8000/%')
            ->orWhere('foto', 'like', '%http://localhost:8000http://localhost:8000/%')
            ->get(['id_treatment', 'foto']);

        foreach ($treatments as $treatment) {
            $fixedPhoto = preg_replace(
                '#^(https?://(?:127\.0\.0\.1|localhost):8000)(https?://(?:127\.0\.0\.1|localhost):8000)#',
                '$2',
                $treatment->foto
            );

            if ($fixedPhoto && $fixedPhoto !== $treatment->foto) {
                DB::table('treatments')
                    ->where('id_treatment', $treatment->id_treatment)
                    ->update(['foto' => $fixedPhoto]);
            }
        }
    }

    public function down(): void
    {
        // Perbaikan URL foto tidak perlu dikembalikan ke format rusak.
    }
};
