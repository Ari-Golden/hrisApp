<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => \App\Models\Employee::factory(), // Akan diganti di seeder
            'foto_selfie' => $this->faker->imageUrl(),
            'time' => $this->faker->time('H:i:s'),
            'date' => $this->faker->dateTimeBetween('-2 months', 'now')->format('Y-m-d'),
            'location' => $this->faker->address(),
            'status' => $this->faker->randomElement(['in', 'out']),
        ];
    }
}
