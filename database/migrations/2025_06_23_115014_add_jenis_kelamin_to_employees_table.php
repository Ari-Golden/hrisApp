<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->enum('jenis_kelamin', ['L', 'P'])->after('nama'); // L = Laki-laki, P = Perempuan
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn('jenis_kelamin');
        });
    }
};
