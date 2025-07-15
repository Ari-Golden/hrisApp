<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amount>
 */
class AmountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'benefit_id' => \App\Models\Benefit::factory(),
            'golongan_id' => \App\Models\Golongan::factory(),
            'jumlah' => $this->faker->randomFloat(2, 100000, 5000000),
        ];
    }
}
