<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Feedback extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'booking_id',
        'title',
        'body',
        'rating',
        'is_published',
    ];

    protected $table = 'feedbacks';
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
