<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('midtrans_transaction_id')->nullable()->after('metode_pembayaran');
            $table->string('midtrans_transaction_status', 50)->nullable()->after('midtrans_transaction_id');
            $table->text('qris_url')->nullable()->after('midtrans_transaction_status');
            $table->timestamp('payment_expires_at')->nullable()->after('qris_url');
            $table->timestamp('paid_at')->nullable()->after('payment_expires_at');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'midtrans_transaction_id',
                'midtrans_transaction_status',
                'qris_url',
                'payment_expires_at',
                'paid_at',
            ]);
        });
    }
};
