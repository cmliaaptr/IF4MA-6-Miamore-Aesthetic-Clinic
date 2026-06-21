<?php

namespace Database\Seeders;

use App\Models\Treatment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TreatmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Treatment::create([
            'nama_treatment' => 'Facial Cleaning',
            'deskripsi' => 'Pembersihan wajah mendalam untuk mengangkat kotoran dan sel kulit mati',
            'foto' => 'https://via.placeholder.com/300',
            'harga' => 150000,
            'diskon' => 10,
            'durasi' => '1x / Bulan',
        ]);

        Treatment::create([
            'nama_treatment' => 'Chemical Peel',
            'deskripsi' => 'Peeling kimia untuk mengangkat lapisan kulit luar dan mencerahkan wajah',
            'foto' => 'https://via.placeholder.com/300',
            'harga' => 250000,
            'diskon' => 5,
            'durasi' => '2x / Bulan',
        ]);

        Treatment::create([
            'nama_treatment' => 'Microdermabrasion',
            'deskripsi' => 'Abrasi mikro untuk meratakan tekstur kulit dan mengurangi bekas jerawat',
            'foto' => 'https://via.placeholder.com/300',
            'harga' => 300000,
            'diskon' => 0,
            'durasi' => '1x / Minggu',
        ]);

        Treatment::create([
            'nama_treatment' => 'Laser Treatment',
            'deskripsi' => 'Perawatan laser untuk menghilangkan bintik dan meremajakan kulit',
            'foto' => 'https://via.placeholder.com/300',
            'harga' => 500000,
            'diskon' => 15,
            'durasi' => '1x / Bulan',
        ]);

        Treatment::create([
            'nama_treatment' => 'Botox Injection',
            'deskripsi' => 'Suntikan botox untuk menghaluskan garis dan kerutan wajah',
            'foto' => 'https://via.placeholder.com/300',
            'harga' => 1000000,
            'diskon' => 20,
            'durasi' => 'Setiap 3 Bulan',
        ]);
    }
}
