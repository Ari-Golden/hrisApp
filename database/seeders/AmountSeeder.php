<?php

namespace Database\Seeders;

use App\Models\Amount;
use App\Models\Benefit;
use App\Models\Golongan;
use Illuminate\Database\Seeder;

class AmountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan ada data Benefit dan Golongan sebelum membuat Amount
        if (Benefit::count() === 0 || Golongan::count() === 0) {
            $this->call(BenefitSeeder::class);
            $this->call(GolonganSeeder::class);
        }

        $benefits = Benefit::all();
        $golongans = Golongan::all();

        foreach ($benefits as $benefit) {
            foreach ($golongans as $golongan) {
                Amount::factory()->create([
                    'benefit_id' => $benefit->id,
                    'golongan_id' => $golongan->id,
                ]);
            }
        }
    }
}
