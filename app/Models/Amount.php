<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amount extends Model
{
    use HasFactory;

    protected $fillable = [
        'benefit_id',
        'golongan_id',
        'jumlah',
    ];

    public function benefit()
    {
        return $this->belongsTo(Benefit::class);
    }

    public function golongan()
    {
        return $this->belongsTo(Golongan::class);
    }
}
