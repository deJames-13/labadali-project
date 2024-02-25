<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laundry extends Model
{
    use HasFactory;

    protected $fillable = ['quantity', 'item_total', 'booking_id', 'laundry_id'];
    public function bookings()
    {
        $this->belongsToMany(Booking::class, 'booking_laundry')->withPivot('quantity', 'item_total', 'booking_id', 'laundry_id');
    }
}
