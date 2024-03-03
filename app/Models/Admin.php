<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
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
