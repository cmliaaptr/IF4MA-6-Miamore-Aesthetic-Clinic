<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $replacementTreatment = DB::table('treatments')
            ->orderBy('id_treatment')
            ->value('nama_treatment');

        if (!$replacementTreatment) {
            return;
        }

        DB::table('bookings')
            ->where(function ($query) {
                $query->whereNull('treatment')
                    ->orWhere('treatment', '')
                    ->orWhere('treatment', 'General');
            })
            ->update(['treatment' => $replacementTreatment]);
    }

    public function down(): void
    {
        // Tidak dikembalikan ke "General" agar data booking tetap memakai treatment nyata.
    }
};
