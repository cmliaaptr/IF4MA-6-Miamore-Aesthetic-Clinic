<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (!Schema::hasColumn('bookings', 'id_dokter')) {
                $table->foreignId('id_dokter')
                    ->nullable()
                    ->after('id_user')
                    ->constrained('users', 'id_user')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'id_dokter')) {
                $table->dropForeign(['id_dokter']);
                $table->dropColumn('id_dokter');
            }
        });
    }
};
