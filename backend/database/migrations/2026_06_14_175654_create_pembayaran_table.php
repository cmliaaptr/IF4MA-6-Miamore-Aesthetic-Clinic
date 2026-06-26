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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id('id_pembayaran');

            $table->unsignedBigInteger('id_booking');

            $table->decimal('total_bayar', 12, 2);

            $table->dateTime('tanggal_bayar');

            $table->string('metode_bayar');

            $table->enum('status', [
                'Menunggu',
                'Lunas',
                'Gagal'
            ])->default('Menunggu');

            $table->timestamps();

            $table->foreign('id_booking')
                ->references('id_booking')
                ->on('bookings')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};
