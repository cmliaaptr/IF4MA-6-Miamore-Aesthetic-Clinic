<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('treatment_assets', function (Blueprint $table) {
            if (Schema::hasColumn('treatment_assets', 'diskon')) {
                $table->dropColumn('diskon');
            }

            if (Schema::hasColumn('treatment_assets', 'harga')) {
                $table->dropColumn('harga');
            }
        });
    }

    public function down(): void
    {
        Schema::table('treatment_assets', function (Blueprint $table) {
            if (!Schema::hasColumn('treatment_assets', 'harga')) {
                $table->decimal('harga', 10, 2)->nullable()->after('foto');
            }

            if (!Schema::hasColumn('treatment_assets', 'diskon')) {
                $table->decimal('diskon', 5, 2)->default(0)->after('harga');
            }
        });
    }
};
