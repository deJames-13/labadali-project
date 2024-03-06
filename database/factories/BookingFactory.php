<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Laundry;
use App\Models\Customer;
use App\Models\Delivery;
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
        $createDate = $this->faker->dateTimeBetween('-1 year', 'now');
        $updateDate = $this->faker->dateTimeBetween($createDate, 'now');
        $customers = Customer::all();
        return [
            'customer_id' => $customers->random()->id,
            'status' => $this->faker->randomElement($statuses),
            'total_price' => $this->faker->randomFloat(2, 100, 1000),
            'created_at' => $createDate,
            'updated_at' => $updateDate,

        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Booking $booking) {
            $laundries = Laundry::all();
            $randomLaundries = $laundries->random(rand(1, 3));

            foreach ($randomLaundries as $laundry) {
                $quantity = $this->faker->numberBetween(1, $laundry->max_qty);
                $item_total = $quantity * $laundry->price;

                $booking->laundries()->attach($laundry->id, [
                    'item_total' => $item_total,
                    'quantity' => $quantity,
                ]);
            }

            $booking->total_price = $booking->laundries()->sum('item_total');
            $booking->save();

            // create a delivery if the status of booking is delivered

            // create a delivery if the status of booking is delivered
            if ($booking->status === 'delivered') {
                Delivery::create([
                    'booking_id' => $booking->id,
                    'shipping_type' => $this->faker->randomElement(['standard', 'express', 'premium']),
                    'shipping_cost' => $this->faker->randomFloat(2, 10, 50),
                    'delivered_date' => $this->faker->dateTimeBetween($booking->created_at, '+7 days'),
                ]);
            }
        });
    }
}
