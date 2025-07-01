<?php

namespace Database\Seeders;

use App\Models\Golongan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GolonganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Golongan::truncate();
        Golongan::create([
            'nama' => 'Golongan 1',
            'kode' => 'G1',
            'gaji' => 5000000,
        ]);

        Golongan::create([
            'nama' => 'Golongan 2',
            'kode' => 'G2',
            'gaji' => 4000000,
        ]);

        Golongan::create([
            'nama' => 'Golongan 3',
            'kode' => 'G3',
            'gaji' => 3000000,
        ]);

        Golongan::create([
            'nama' => 'Golongan 4',
            'kode' => 'G4',
            'gaji' => 2500000,
        ]);

        Golongan::create([
            'nama' => 'Golongan 5',
            'kode' => 'G5',
            'gaji' => 2000000,
        ]);
    }
}
