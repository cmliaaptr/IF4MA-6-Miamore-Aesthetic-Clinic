<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('id_booking');
            $table->string('order_id')->unique();
            $table->string('nama_lengkap');
            $table->date('tanggal_lahir');
            $table->string('jenis_kelamin', 20);
            $table->string('no_telephone', 30);
            $table->string('email')->nullable();
            $table->text('alamat');
            $table->date('tanggal_booking');
            $table->time('waktu_booking');
            $table->string('treatment');
            $table->string('dokter_terapis')->nullable();
            $table->text('catatan')->nullable();
            $table->decimal('total_pembayaran', 12, 2)->nullable();
            $table->string('metode_pembayaran', 50)->nullable();
            $table->string('status_booking', 30)->default('Booking');
            $table->string('status_pembayaran', 30)->default('Belum Dibayar');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
