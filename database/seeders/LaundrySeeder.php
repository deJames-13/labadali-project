<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaundrySeeder extends Seeder
{
    const laundries = [
        [
            'title' => 'WASH-DRY-FOLD per Kilo',
            'description' => 'Wash, Dry, Fold per Kilo',
            'price' => 39,
            'min_kilos' => 5,
            'detergent_per_kilo' => 150,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Wash-Dry & Fold for Blankets, Curtains, Towels, and Comforters',
            'description' => 'Wash-Dry & Fold for Blankets, Curtains, Towels, and Comforters',
            'price' => 90,
            'min_kilos' => 3,
            'detergent_per_kilo' => 150,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Wash-Dry & Press',
            'description' => 'Wash-Dry & Press',
            'price' => 99,
            'min_kilos' => 3,
            'detergent_per_kilo' => 150,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Clothes (hand wash, dry)',
            'description' => 'Clothes (hand wash, dry)',
            'detergent_per_kilo' => 85,
            'price' => 85,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Denim (wash, dry, fold)',
            'description' => 'Denim (wash, dry, fold)',
            'price' => 60,
            'detergent_per_kilo' => 60,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Linen (wash, dry, fold)',
            'description' => 'Linen (wash, dry, fold)',
            'price' => 80,
            'detergent_per_kilo' => 80,
            'turnaround_day' => 3,
        ],

    ];
    public function run(): void
    {
        // clear items but make it safe on foreign key constraints
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \App\Models\Laundry::truncate();
        foreach (self::laundries as $laundry) {
            $laundry['created_at'] = now();
            $laundry['updated_at'] = now();
            \App\Models\Laundry::create($laundry);
        }
    }
}
