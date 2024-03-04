<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        // clear wuthout constraints error
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        // \App\Models\Booking::truncate();

        \App\Models\Booking::factory()
            ->count(200)
            ->create();
    }
}
