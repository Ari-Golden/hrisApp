<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departemen extends Model
{
    use HasFactory;

    protected $fillable = ['kode', 'nama', 'keterangan'];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'departemen_id');
    }
}
