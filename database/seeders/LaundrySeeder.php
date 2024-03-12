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
            'price' => 85,
            'min_kilos' => 3,
            'detergent_per_kilo' => 85,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Denim (wash, dry, fold)',
            'description' => 'Denim (wash, dry, fold)',
            'price' => 60,
            'min_kilos' => 1,
            'detergent_per_kilo' => 60,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Linen (wash, dry, fold)',
            'description' => 'Linen (wash, dry, fold)',
            'price' => 80,
            'min_kilos' => 1,
            'detergent_per_kilo' => 80,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Blanket (wash, dry, fold)',
            'description' => 'Blanket (wash, dry, fold)',
            'price' => 95,
            'min_kilos' => 1,
            'detergent_per_kilo' => 95,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Comforter (wash, airdry, fold)',
            'description' => 'Comforter (wash, airdry, fold)',
            'price' => 285,
            'min_kilos' => 3,
            'detergent_per_kilo' => 285,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Floor Rugs (wash, airdry)',
            'description' => 'Floor Rugs (wash, airdry)',
            'price' => 130,
            'min_kilos' => 1,
            'detergent_per_kilo' => 130,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Towel (wash, dry, fold)',
            'description' => 'Towel (wash, dry, fold)',
            'price' => 80,
            'min_kilos' => 1,
            'detergent_per_kilo' => 80,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Curtain (wash, dry, fold)',
            'description' => 'Curtain (wash, dry, fold)',
            'price' => 120,
            'min_kilos' => 1,
            'detergent_per_kilo' => 120,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Wash & Fold',
            'description' => 'Wash & Fold',
            'price' => 41,
            'min_kilos' => 5,
            'detergent_per_kilo' => 41,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Wash, Iron & Fold',
            'description' => 'Wash, Iron & Fold',
            'price' => 52,
            'min_kilos' => 5,
            'detergent_per_kilo' => 52,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Iron Only',
            'description' => 'Iron Only',
            'price' => 35,
            'min_kilos' => 5,
            'detergent_per_kilo' => 35,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'Dry & Fold',
            'description' => 'Dry & Fold',
            'price' => 35,
            'min_kilos' => 1,
            'detergent_per_kilo' => 35,
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
