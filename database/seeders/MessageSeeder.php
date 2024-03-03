<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Message;
use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all admins and customers
        $admins = Admin::all();
        $customers = Customer::all();

        // clear messages first
        Message::truncate();
        // Create 50 messages
        for ($i = 0; $i < 10; $i++) {
            $sender = $customers->random();
            $recipient = $admins->random();

            // Create a new message
            Message::create([
                'sender_id' => $sender->id,
                'sender_type' => get_class($sender),
                'recipient_id' => $recipient->id,
                'recipient_type' => get_class($recipient),
                'content' => fake()->sentence(),
            ]);
            sleep(1);
        }
    }
}
