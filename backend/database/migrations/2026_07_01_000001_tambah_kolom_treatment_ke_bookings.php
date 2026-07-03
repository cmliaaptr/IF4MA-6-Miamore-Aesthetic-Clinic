<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('bookings', 'treatment')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->string('treatment')->nullable()->after('waktu_booking');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('bookings', 'treatment')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('treatment');
            });
        }
    }
};
