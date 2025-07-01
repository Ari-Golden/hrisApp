<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id(); // ID auto increment
            $table->string('id_employee')->unique(); // Kode unik karyawan
            $table->string('nama');
            $table->unsignedBigInteger('gol_id'); // Relasi ke tabel golongan
            $table->unsignedBigInteger('jabatan_id'); // Relasi ke tabel jabatan
            $table->unsignedBigInteger('departemen_id'); // Relasi ke tabel departemen

            $table->enum('status', ['aktif', 'non-aktif'])->default('aktif');
            $table->string('status_pernikahan'); // contoh: menikah / belum menikah
            $table->text('alamat');
            $table->string('no_hp');
            $table->string('no_emergency');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
