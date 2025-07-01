<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->date('join_date')->nullable()->after('status_pernikahan');
            $table->string('foto')->nullable()->after('join_date'); // path ke file foto
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn(['join_date', 'foto']);
        });
    }
};