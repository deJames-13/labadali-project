<?php

namespace App\Models;

use App\Models\Inventory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Laundry extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'price',
        'min_kilos',
        'detergent_per_kilo',
        'turnaround_day',
        'image_path'
    ];
    public function bookings()
    {
        $this->belongsToMany(Booking::class, 'booking_laundry')->withPivot('quantity', 'item_total', 'booking_id', 'laundry_id');
    }
}
