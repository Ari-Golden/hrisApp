<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Golongan>
 */
class GolonganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => 'G' . $this->faker->unique()->numberBetween(1, 10),
        'nama' => 'Golongan ' . $this->faker->randomElement(['I', 'II', 'III', 'IV']),
        'keterangan' => $this->faker->sentence(),
        ];
    }
}
