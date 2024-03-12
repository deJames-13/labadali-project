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
            'position' => 'Administrator',
        ]);

        // create more customer
        \App\Models\Customer::factory()->count(100)->create();


        $this->call([
            LaundrySeeder::class,
            InventorySeeder::class,
            BookingSeeder::class,
        ]);
    }
}
