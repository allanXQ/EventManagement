<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['event_id', 'user_email'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
