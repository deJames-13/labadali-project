<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'city',
        'region',
        'zip_code',
        'image_path',
        'phone_number',
        'birthdate',
        'age',
        'position',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
    public function messages()
    {
        return $this->morphMany(Message::class, 'sender');
    }
    public function received()
    {
        return $this->morphMany(Message::class, 'recipient');
    }
}
