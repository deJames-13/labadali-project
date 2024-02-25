<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Laundry::factory(20)->create();
        \App\Models\Admin::factory(10)->create();

        $user = \App\Models\User::factory()->create([
            'username' => 'jdoe',
            'email' => 'test@example.com',
        ]);

        \App\Models\Customer::factory()->create([
            'id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);

        \App\Models\Admin::factory()->create([
            'id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);
    }
}
