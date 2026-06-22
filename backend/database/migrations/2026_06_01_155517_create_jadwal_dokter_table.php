<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jadwal_dokter', function (Blueprint $table) {
            $table->id('id_jadwal');
            $table->string('hari');
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->integer('kapasitas');
            $table->timestamps();
            $table->unsignedBigInteger('id_dokter');

            $table->foreign('id_dokter')
                ->references('id_user')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jadwal_dokter');
    }
};
