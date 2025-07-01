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
        Schema::table('golongans', function (Blueprint $table) {
            $table->decimal('gaji', 15, 2)->default(0.00)->after('keterangan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('golongans', function (Blueprint $table) {
            if (Schema::hasColumn('golongans', 'gaji')) {
                $table->dropColumn('gaji');
            }
        });
    }
};
