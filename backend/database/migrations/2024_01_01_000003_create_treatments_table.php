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
        Schema::create('treatments', function (Blueprint $table) {
            $table->id('id_treatment');
            $table->string('nama_treatment');
            $table->longText('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->decimal('harga', 10, 2);
            $table->decimal('diskon', 5, 2)->default(0);
            $table->string('durasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
