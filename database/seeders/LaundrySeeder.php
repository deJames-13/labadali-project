<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaundrySeeder extends Seeder
{
    const laundries = [
        [
            'title' => 'WASH-DRY-FOLD per Bag',
            'description' => 'Wash, Dry, Fold per Bag',
            'price' => 350,
            'max_kilo' => 8,
            'max_qty' => 3,
            'turnaround_day' => 4,
        ],
        [
            'title' => 'COMFORTER',
            'description' => 'Specialized cleaning service for comforters, ensuring they are clean and fresh.',
            'price' => 500,
            'max_kilo' => 5,
            'max_qty' => 3,
            'turnaround_day' => 5,
        ],
        [
            'title' => 'BEDSHEETS',
            'description' => 'Professional cleaning service for bedsheets, ensuring they are clean, fresh, and crisp.',
            'price' => 300,
            'max_kilo' => 6,
            'max_qty' => 3,
            'turnaround_day' => 2,
        ],
        [
            'title' => 'HANDWASH/SPECIAL WASH',
            'description' => 'Handwash service for delicate items or special wash requirements.',
            'price' => 400,
            'max_kilo' => 3,
            'max_qty' => 3,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'DRY CLEANING',
            'description' => 'Professional dry cleaning service for delicate and special-care items.',
            'price' => 600,
            'max_kilo' => 3,
            'max_qty' => 2,
            'turnaround_day' => 5,
        ],
        [
            'title' => 'SUITS',
            'description' => 'Specialized cleaning and pressing service for suits.',
            'price' => 700,
            'max_kilo' => 2,
            'max_qty' => 2,
            'turnaround_day' => 4,
        ],
        [
            'title' => 'WEDDING GOWN',
            'description' => 'Expert cleaning and preservation service for wedding gowns.',
            'price' => 1500,
            'max_kilo' => 5,
            'max_qty' => 1,
            'turnaround_day' => 7,
        ],
        [
            'title' => 'BARONG',
            'description' => 'Specialized cleaning service for Barong Tagalog, ensuring it is clean and crisp.',
            'price' => 500,
            'max_kilo' => 1,
            'max_qty' => 2,
            'turnaround_day' => 3,
        ],
        [
            'title' => 'TUXEDO',
            'description' => 'Professional cleaning and pressing service for tuxedos.',
            'price' => 700,
            'max_kilo' => 2,
            'max_qty' => 2,
            'turnaround_day' => 4,
        ],
        [
            'title' => 'IRONING',
            'description' => 'Professional ironing service for a crisp, wrinkle-free finish.',
            'price' => 200,
            'max_kilo' => 6,
            'max_qty' => 3,
            'turnaround_day' => 2,
        ],
        [
            'title' => 'LAUNDRY DISINFECTION',
            'description' => 'Laundry disinfection service to eliminate bacteria and germs from your clothes.',
            'price' => 450,
            'max_kilo' => 8,
            'max_qty' => 3,
            'turnaround_day' => 4,
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
