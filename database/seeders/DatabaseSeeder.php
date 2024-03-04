<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Faker\Factory;
use App\Models\Message;
use Illuminate\Database\Seeder;
use Illuminate\Support\Testing\Fakes\Fake;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Laundry::factory(10)->create();
        \App\Models\Admin::factory(5)->create();

        $user = \App\Models\User::factory()->create([
            'username' => 'jdoe',
            'email' => 'test@example.com',
        ]);

        $customer = \App\Models\Customer::factory()->create([
            'id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);

        $admin = \App\Models\Admin::factory()->create([
            'id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);

        \App\Models\Customer::factory(100)->create();
    }
}
