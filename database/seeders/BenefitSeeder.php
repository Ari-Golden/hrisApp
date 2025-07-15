<?php

namespace Database\Seeders;

use App\Models\Benefit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Using truncate to start with a clean table
        DB::table('benefits')->truncate();

        $benefits = [
            // Tunjangan (Allowances)
            [
                'nama' => 'Tunjangan Kesehatan',
                'deskripsi' => 'Tunjangan untuk biaya pemeliharaan kesehatan.',
                'jenis' => 'tunjangan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Tunjangan Transportasi',
                'deskripsi' => 'Tunjangan untuk biaya transportasi harian ke tempat kerja.',
                'jenis' => 'tunjangan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Tunjangan Makan',
                'deskripsi' => 'Tunjangan untuk biaya makan siang selama hari kerja.',
                'jenis' => 'tunjangan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Tunjangan Hari Raya (THR)',
                'deskripsi' => 'Tunjangan keagamaan yang diberikan setahun sekali.',
                'jenis' => 'tunjangan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Tunjangan Jabatan',
                'deskripsi' => 'Tunjangan yang diberikan berdasarkan tingkat jabatan.',
                'jenis' => 'tunjangan',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Potongan (Deductions)
            [
                'nama' => 'Potongan BPJS Kesehatan',
                'deskripsi' => 'Iuran bulanan untuk program jaminan kesehatan nasional.',
                'jenis' => 'potongan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Potongan BPJS Ketenagakerjaan',
                'deskripsi' => 'Iuran bulanan untuk jaminan hari tua, kecelakaan kerja, dan kematian.',
                'jenis' => 'potongan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Potongan PPh 21',
                'deskripsi' => 'Potongan pajak penghasilan atas gaji sesuai peraturan pemerintah.',
                'jenis' => 'potongan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Potongan Keterlambatan',
                'deskripsi' => 'Potongan gaji yang dikenakan akibat keterlambatan masuk kerja.',
                'jenis' => 'potongan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the database
        Benefit::insert($benefits);
    }
}
