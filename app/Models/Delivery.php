<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'booking_id',
        'shipping_type',
        'shipping_cost',
        'delivered_date',

    ];
    protected $table = 'deliveries';
    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }
}
