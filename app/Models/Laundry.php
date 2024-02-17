<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laundry extends Model
{
    use HasFactory;

    public function bookings()
    {
        $this->belongsToMany(Booking::class)->withPivot('quantity', 'item_total');
    }
}
