<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jabatan>
 */
class JabatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => 'JB' . $this->faker->unique()->numberBetween(1, 20),
        'nama' => $this->faker->randomElement(['Manager', 'Staff', 'Supervisor', 'Admin']),
        'keterangan' => $this->faker->sentence(),
        ];
    }
}
