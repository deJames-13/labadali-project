<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class InventorySeeder extends Seeder
{
    const items = [
        [
            "item_name" => 'Ariel Power Gel Liquid Detergent',
            "stock" => 20,
            "tags" => 'detergent,1L,sunfresh',
            "instructions" => "Stock Update",
        ],
        [
            "item_name" => 'Tide Plus Downy Liquid Detergent',
            "stock" => 20,
            "tags" => 'detergent,1L,Sweet Dreams',
            "instructions" => "Stock Update",
        ],
        [
            "item_name" => 'Breeze Liquid Detergent',
            "stock" => 20,
            "tags" => 'detergent,1L,Sun Fresh',
            "instructions" => "Stock Update",
        ],
        [
            "item_name" => 'Surf Liquid Detergent',
            "stock" => 20,
            "tags" => 'detergent,1L,Blossom Fresh',
            "instructions" => "Stock Update",
        ],
        [
            "item_name" => 'Pride Powerwash Liquid Detergent',
            "stock" => 20,
            "tags" => 'detergent,1L,Anti-Bacterial',
            "instructions" => "Stock Update",
        ],
        [
            "item_name" => 'Human Nature 100% Natural Liquid Detergent',
            "stock" => 20,
            "tags" => 'detergent,1L,Natural',
            "instructions" => "Stock Update",
        ],

    ];
    public function run(): void
    {
        // clear items but make it safe on foreign key constraints
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \App\Models\Inventory::truncate();
        foreach (self::items as $item) {
            $item['created_at'] = now();
            $item['updated_at'] = now();
            \App\Models\Inventory::create($item);
        }
    }
}
