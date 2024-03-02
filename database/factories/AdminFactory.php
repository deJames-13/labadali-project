<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'id' => \App\Models\User::factory()->create()->id,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'address' => fake()->address(),
            'position' => fake()->company(),
            'city' => fake()->city(),
            'zip_code' => fake()->postcode(),
            'phone_number' => fake()->phoneNumber(),
            'birthdate' => fake()->date(max: '2003-01-01'),
            'age' => fake()->numberBetween(18, 40),
            'image_path' => 'https://picsum.photos/640/480?random=' . fake()->numberBetween(1, 1000),

        ];
    }
}
