<?php

namespace App\Models;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        "item_name",
        "stock",

        "tags",
        "instructions",
        "cost_per_stock",
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
