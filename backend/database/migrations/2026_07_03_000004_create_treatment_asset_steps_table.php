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
        Schema::create('treatment_asset_steps', function (Blueprint $table) {
            $table->id('id_treatment_asset_step');
            $table->foreignId('id_treatment_asset')
                ->constrained('treatment_assets', 'id_treatment_asset')
                ->cascadeOnDelete();
            $table->string('nama_langkah');
            $table->string('produk');
            $table->string('takaran');
            $table->string('durasi')->nullable();
            $table->text('cara_penggunaan')->nullable();
            $table->unsignedSmallInteger('urutan')->default(1);
            $table->timestamps();
        });

        $now = now();
        $assets = DB::table('treatment_assets')
            ->pluck('id_treatment_asset', 'nama_treatment');

        $seedSteps = [
            'HydraGlow Facial' => [
                ['Cleansing', 'Gentle Facial Cleanser', '2 pump', '5 Menit', 'Ratakan pada wajah lembap selama 60 detik, lalu bilas bersih.'],
                ['Hydrating Toner', 'Hydra Balance Toner', '4-5 tetes', '5 Menit', 'Tap ringan ke seluruh wajah sampai meresap.'],
                ['Serum Glow', 'Niacinamide Glow Serum', '3 tetes', '5 Menit', 'Aplikasikan merata pada wajah dan leher.'],
                ['Masker', 'Hydra Jelly Mask', '20 gram bubuk + 40 ml air', '15 Menit', 'Diamkan 12-15 menit, lalu angkat perlahan.'],
                ['Moisturizer', 'Barrier Moist Cream', '1 ruas jari', '5 Menit', 'Kunci hidrasi dengan pijatan ringan.'],
                ['Sunscreen', 'Daily UV Shield SPF 50', '2 ruas jari', '5 Menit', 'Gunakan sebagai langkah akhir pada treatment pagi/siang.'],
            ],
            'Acne Treatment' => [
                ['Cleansing', 'Acne Gentle Cleanser', '2 pump', '5 Menit', 'Bersihkan wajah tanpa menggosok area radang terlalu kuat.'],
                ['Soft Exfoliation', 'BHA Clarifying Toner', '3-4 tetes', '7 Menit', 'Aplikasikan tipis pada area berminyak dan komedo.'],
                ['Extraction', 'Sterile Comedo Tools', 'Sesuai kebutuhan', '10 Menit', 'Lakukan ekstraksi pada komedo matang dengan tekanan minimal.'],
                ['Calming Serum', 'Centella Acne Serum', '3 tetes', '5 Menit', 'Fokuskan pada area kemerahan dan bekas jerawat.'],
                ['LED Therapy', 'Blue LED Acne Mode', '10 menit', '10 Menit', 'Gunakan pelindung mata dan arahkan merata ke area wajah.'],
                ['Acne Mask', 'Tea Tree Clay Mask', '1 spatula', '10 Menit', 'Diamkan 10 menit, hindari area mata dan bibir.'],
                ['Spot Care', 'Acne Spot Gel', 'Tipis di titik jerawat', '5 Menit', 'Gunakan hanya pada jerawat aktif.'],
                ['Sunscreen', 'Oil Control SPF 50', '2 ruas jari', '5 Menit', 'Aplikasikan merata untuk melindungi kulit pasca tindakan.'],
            ],
            'Brightening Facial' => [
                ['Cleansing', 'Brightening Cleanser', '2 pump', '5 Menit', 'Bersihkan wajah sampai sisa sunscreen dan makeup terangkat.'],
                ['Vitamin Toner', 'Vitamin C Toner', '5 tetes', '5 Menit', 'Tap ringan untuk mempersiapkan kulit.'],
                ['Bright Serum', 'Tranexamic Bright Serum', '3 tetes', '5 Menit', 'Fokuskan pada area kusam dan hiperpigmentasi.'],
                ['Massage Cream', 'Pearl Massage Cream', '1 spatula', '10 Menit', 'Pijat lembut 8-10 menit mengikuti arah lifting.'],
                ['Bright Mask', 'Vitamin Radiance Mask', '1 sachet', '12 Menit', 'Diamkan 12 menit lalu bersihkan dengan sponge lembap.'],
                ['Sunscreen', 'Tone Up SPF 50', '2 ruas jari', '5 Menit', 'Ratakan sampai tidak ada garis putih berlebih.'],
            ],
        ];

        foreach ($seedSteps as $assetName => $steps) {
            $assetId = $assets[$assetName] ?? null;

            if (!$assetId) {
                continue;
            }

            foreach ($steps as $index => $step) {
                DB::table('treatment_asset_steps')->insert([
                    'id_treatment_asset' => $assetId,
                    'nama_langkah' => $step[0],
                    'produk' => $step[1],
                    'takaran' => $step[2],
                    'durasi' => $step[3],
                    'cara_penggunaan' => $step[4],
                    'urutan' => $index + 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatment_asset_steps');
    }
};
