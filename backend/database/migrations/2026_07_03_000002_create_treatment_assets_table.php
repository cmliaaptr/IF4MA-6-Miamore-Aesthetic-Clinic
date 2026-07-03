<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('treatment_assets', function (Blueprint $table) {
            $table->id('id_treatment_asset');
            $table->string('nama_treatment');
            $table->string('kategori');
            $table->longText('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->string('durasi');
            $table->string('status')->default('Aktif');
            $table->timestamps();
        });

        DB::table('treatment_assets')->insert([
            [
                'nama_treatment' => 'HydraGlow Facial',
                'kategori' => 'Facial',
                'deskripsi' => 'Perawatan untuk membersihkan, menghidrasi, dan mencerahkan kulit secara menyeluruh.',
                'foto' => '/images/brightening.jpg',
                'durasi' => '60 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Acne Treatment',
                'kategori' => 'Acne Care',
                'deskripsi' => 'Perawatan khusus untuk kulit berjerawat, mengurangi peradangan dan mencegah jerawat baru.',
                'foto' => '/images/acne.jpg',
                'durasi' => '75 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Brightening Facial',
                'kategori' => 'Brightening',
                'deskripsi' => 'Perawatan yang membantu mencerahkan kulit kusam dan menyamarkan noda hitam.',
                'foto' => '/images/flek.jpg',
                'durasi' => '60 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Chemical Peeling',
                'kategori' => 'Peeling',
                'deskripsi' => 'Mengangkat sel kulit mati dan membantu mengatasi flek, bekas jerawat, dan tekstur kulit tidak rata.',
                'foto' => '/images/co2 fractional.jpg',
                'durasi' => '45 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Microneedling',
                'kategori' => 'Rejuvenation',
                'deskripsi' => 'Merangsang produksi kolagen untuk memperbaiki tekstur kulit, pori-pori, dan bekas jerawat.',
                'foto' => '/images/anti-aging.jpeg',
                'durasi' => '60 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Anti-Aging Facial',
                'kategori' => 'Anti-Aging',
                'deskripsi' => 'Perawatan untuk menjaga elastisitas kulit dan membantu menyamarkan tanda penuaan.',
                'foto' => '/images/why-product.jpg',
                'durasi' => '60 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Laser Rejuvenation',
                'kategori' => 'Laser',
                'deskripsi' => 'Perawatan laser untuk membantu meratakan tekstur dan tampilan kulit.',
                'foto' => '/images/treatment-hero.png',
                'durasi' => '30 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_treatment' => 'Hydrafacial Premium',
                'kategori' => 'Premium',
                'deskripsi' => 'Perawatan premium untuk membersihkan, mengeksfoliasi, dan menghidrasi kulit.',
                'foto' => '/images/hero-landing.JPG',
                'durasi' => '75 Menit',
                'status' => 'Aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatment_assets');
    }
};
