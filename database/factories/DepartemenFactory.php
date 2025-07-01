<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Departemen>
 */
class DepartemenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => 'DEP' . $this->faker->unique()->numberBetween(1, 10),
        'nama' => $this->faker->randomElement(['HRD', 'Finance', 'IT', 'Produksi']),
        'keterangan' => $this->faker->sentence(),
        ];
    }
}
