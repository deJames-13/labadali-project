<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_id', // 'customer_id' is the foreign key of the 'customers' table
        'total_price',
        'status',
    ];
    use HasFactory;

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function laundries()
    {
        return $this->belongsToMany(Laundry::class)->withPivot('quantity', 'item_total');
    }
}
