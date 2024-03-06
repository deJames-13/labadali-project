<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        return $this->belongsToMany(Laundry::class, 'booking_laundry')
            ->withPivot('quantity', 'item_total', 'booking_id', 'laundry_id');
    }
    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }
    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }


    // add a scope filter for following attributes
    /*
    first_name
    last_name
    address        
    total_price
    status
    id
    */
    // Scope filters
    public function scopeFirstName($query, $firstName)
    {
        return $query->whereHas('customer', function ($query) use ($firstName) {
            $query->where('first_name', $firstName);
        });
    }

    public function scopeLastName($query, $lastName)
    {
        return $query->whereHas('customer', function ($query) use ($lastName) {
            $query->where('last_name', $lastName);
        });
    }

    public function scopeAddress($query, $address)
    {
        return $query->whereHas('customer', function ($query) use ($address) {
            $query->where('address', $address);
        });
    }

    public function scopeTotalPrice($query, $totalPrice)
    {
        return $query->where('total_price', $totalPrice);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeId($query, $id)
    {
        return $query->where('id', $id);
    }
    public function scopeSearch($query, $searchTerm)
    {
        return $query->where('total_price', 'LIKE', "%{$searchTerm}%")
            ->orWhere('status', 'LIKE', "%{$searchTerm}%")
            ->orWhere('id', 'LIKE', "%{$searchTerm}%")
            ->orWhere(DB::raw("DATE_FORMAT(created_at, '%M %d, %Y')"), 'LIKE', "%{$searchTerm}%")
            ->orWhereHas('customer', function ($query) use ($searchTerm) {
                $query->where('first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('last_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('address', 'LIKE', "%{$searchTerm}%");
            });
    }
}
