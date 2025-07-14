<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $this->call([
        GolonganSeeder::class,
        DepartemSeeder::class,
        JabatanSeeder::class,
        EmployeeSeeder::class,
        AttendanceSeeder::class, // setelah data referensi
    ]);

        $this->call([
            CandidateSeeder::class,
        ]);
    }
}
