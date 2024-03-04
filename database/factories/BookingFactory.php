<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Laundry;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition()
    {
        // $statuses = ['ongoing', 'finished', 'delivered'];
        $statuses = ['pending', 'ongoing', 'finished', 'delivered', 'cancelled'];
        $customers = Customer::all();
        return [
            'customer_id' => $customers->random()->id,
            'status' => $this->faker->randomElement($statuses),
            'total_price' => $this->faker->randomFloat(2, 100, 1000),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Booking $booking) {
            $laundry = Laundry::inRandomOrder()->first();
            $quantity = $this->faker->numberBetween(1, $laundry->max_qty);
            $item_total = $quantity * $laundry->price;

            $booking->laundries()->attach($laundry->id, [
                'item_total' => $item_total,
                'quantity' => $quantity,
            ]);

            // Update the total price of the booking
            $booking->total_price = $booking->laundries()->sum('item_total');
            $booking->save();
        });
    }
}
