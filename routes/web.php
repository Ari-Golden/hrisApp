<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\RecruitmentController;
use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'totalEmployee' => Employee::count(),
            'totalMaleEmployee' => Employee::where('jenis_kelamin', 'L')->count(),
            'totalFemaleEmployee' => Employee::where('jenis_kelamin', 'P')->count(),
            'newEmployee' => Employee::whereMonth('join_date', now()->month)->count(),
            'terminatedEmployee' => Employee::where('status', 'non-aktif')->count(),
            'leaveEmployee' => 5,
            'employees'=> Employee::with('jabatan', 'golongan', 'departemen')->get(),
        ]);
    })->name('dashboard');
    Route::resource('Recruitment',RecruitmentController::class);
    Route::resource('Payroll',PayrollController::class);

    Route::resource('Employee', EmployeeController::class);
    Route::resource('Attendance', AttendanceController::class);
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
