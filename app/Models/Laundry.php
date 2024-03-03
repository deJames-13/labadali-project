<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laundry extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'max_kilo',
        'max_items',
        'max_qty',
        'turnaround_day',
        'image_path'
    ];
    public function bookings()
    {
        $this->belongsToMany(Booking::class, 'booking_laundry')->withPivot('quantity', 'item_total', 'booking_id', 'laundry_id');
    }
}
