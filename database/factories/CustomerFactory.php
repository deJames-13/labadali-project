<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = \App\Models\User::factory()->create();

        return [
            'id' => $user->id,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'zip_code' => fake()->postcode(),
            'phone_number' => fake()->phoneNumber(),
            'birthdate' => fake()->date(max: '2003-01-01'),
            'age' => fake()->numberBetween(18, 40),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,


        ];
    }
}
