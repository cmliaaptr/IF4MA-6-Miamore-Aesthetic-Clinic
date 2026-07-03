<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('treatments', function (Blueprint $table) {
            if (Schema::hasColumn('treatments', 'kategori')) {
                $table->dropColumn('kategori');
            }

            if (Schema::hasColumn('treatments', 'status')) {
                $table->dropColumn('status');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('treatments', function (Blueprint $table) {
            if (!Schema::hasColumn('treatments', 'kategori')) {
                $table->string('kategori')->default('Treatment')->after('nama_treatment');
            }

            if (!Schema::hasColumn('treatments', 'status')) {
                $table->string('status')->default('Aktif')->after('durasi');
            }
        });
    }
};
