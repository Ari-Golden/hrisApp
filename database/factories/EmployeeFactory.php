<?php

namespace Database\Factories;

use App\Models\Golongan;
use App\Models\Jabatan;
use App\Models\Departemen;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_employee' => 'EMP' . str_pad($this->faker->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT),
            'nama' => $this->faker->name,
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'gol_id' => Golongan::inRandomOrder()->first()->id,
            'jabatan_id' => Jabatan::inRandomOrder()->first()->id,
            'departemen_id' => Departemen::inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(['aktif', 'non-aktif']),
            'status_pernikahan' => $this->faker->randomElement(['menikah', 'belum menikah']),
            'alamat' => $this->faker->address,
            'no_hp' => $this->faker->phoneNumber,
            'no_emergency' => $this->faker->phoneNumber,
            'join_date' => $this->faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'foto' => 'default.jpg', // atau path dummy: 'uploads/foto/EMP001.jpg'

        ];
    }
}
