<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_employee',
        'nama',
        'jenis_kelamin',
        'gol_id',
        'jabatan_id',
        'departemen_id',
        'status',
        'status_pernikahan',
        'join_date',       // ⬅️ tambah ini
        'foto',            // ⬅️ dan ini
        'alamat',
        'no_hp',
        'no_emergency',
    ];

    // Contoh relasi
     public function absensi()
    {
        return $this->hasMany(Attendance::class, 'id_employee');
    }
    public function golongan()
    {
        return $this->belongsTo(Golongan::class, 'gol_id');
    }

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id');
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class, 'departemen_id');
    }
}
