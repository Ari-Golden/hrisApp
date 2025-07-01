<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $faker = \Faker\Factory::create();

        foreach ($employees as $employee) {
            // Generate attendance for the last 30 days
            for ($i = 0; $i < 30; $i++) {
                $date = Carbon::now()->subDays($i)->format('Y-m-d');

                // Randomly decide if the employee is absent, on leave, or sick for this day
                if ($faker->boolean(15)) { // 15% chance of being absent/leave/sick
                    $status = $faker->randomElement(['absent', 'leave', 'sick']);
                    Attendance::factory()->create([
                        'employee_id' => $employee->id,
                        'date' => $date,
                        'time' => null, // Time is not relevant for absence/leave/sick
                        'status' => $status,
                        'location' => $faker->address(),
                        'foto_selfie' => $faker->imageUrl(),
                    ]);
                } else {
                    // Generate check-in time (e.g., between 07:00 and 09:00)
                    $checkInTime = Carbon::parse($faker->time('H:i:s', '09:00:00'))->setTime(7, 0, 0)->addMinutes($faker->numberBetween(0, 120));

                    // Generate check-out time (e.g., between 16:00 and 18:00)
                    $checkOutTime = Carbon::parse($faker->time('H:i:s', '18:00:00'))->setTime(16, 0, 0)->addMinutes($faker->numberBetween(0, 120));

                    // Ensure check-out time is after check-in time
                    if ($checkOutTime->lessThanOrEqualTo($checkInTime)) {
                        $checkOutTime = $checkInTime->addHours($faker->numberBetween(7, 9)); // Add 7-9 hours to check-in time
                    }

                    // Create check-in record
                    Attendance::factory()->create([
                        'employee_id' => $employee->id,
                        'date' => $date,
                        'time' => $checkInTime->format('H:i:s'),
                        'status' => 'in',
                        'location' => $faker->address(),
                        'foto_selfie' => $faker->imageUrl(),
                    ]);

                    // Create check-out record
                    Attendance::factory()->create([
                        'employee_id' => $employee->id,
                        'date' => $date,
                        'time' => $checkOutTime->format('H:i:s'),
                        'status' => 'out',
                        'location' => $faker->address(),
                        'foto_selfie' => $faker->imageUrl(),
                    ]);
                }
            }
        }
    }
}
