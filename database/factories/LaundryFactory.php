<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Laundry>
 */
class LaundryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'description' => fake()->sentence(),
            'price' => fake()->numberBetween(1, 1000),
            'max_kilo' => fake()->numberBetween(1, 100),
            'max_items' => fake()->numberBetween(1, 100),
            'turnaround_day' => fake()->numberBetween(1, 100),
        ];
    }
}
