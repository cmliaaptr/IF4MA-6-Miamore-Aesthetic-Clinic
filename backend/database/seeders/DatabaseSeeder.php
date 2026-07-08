<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'email' => 'admin@miamore.test',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['username' => 'carla'],
            [
                'email' => 'carla@miamore.test',
                'password' => Hash::make('putri123'),
                'role' => 'pelanggan',
            ]
        );

        User::updateOrCreate(
            ['username' => 'Dr. Mirna'],
            [
                'email' => 'mirna@miamore.test',
                'password' => Hash::make('dokter123'),
                'role' => 'dokter',
            ]
        );

        $this->call([
            TreatmentSeeder::class,
        ]);
    }
}
