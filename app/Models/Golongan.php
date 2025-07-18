<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Golongan extends Model
{
    use HasFactory;

    protected $fillable = ['kode', 'nama', 'keterangan', 'gaji'];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'gol_id');
    }

    public function amounts()
    {
        return $this->hasMany(Amount::class, 'golongan_id');
    }
}
