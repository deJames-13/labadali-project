<?php

namespace App\Models;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = [
        "item_name",
        "stock",
        "tags",
        "instructions",
        "image_path",
    ];
    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_inventory')
            ->withPivot('booking_id', 'inventory_id', 'quantity_used');
    }

    public function scopeHasTag($query, $tag)
    {
        return $query->where('tags', 'like', "%{$tag}%");
    }
}
