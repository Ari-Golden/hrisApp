<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\RecruitmentController;
use App\Http\Controllers\GolonganController;
use App\Http\Controllers\BenefitController;
use App\Http\Controllers\AmountController;
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
        ]);
    })->name('dashboard');
    Route::resource('Recruitment',RecruitmentController::class);
    Route::resource('Payroll',PayrollController::class);
    Route::get('payroll/tax', [PayrollController::class, 'taxIndex'])->name('payroll.tax.index');
    Route::get('Calendar', [CalendarController::class, 'index'])->name('Calendar');
    Route::get('api/events', [CalendarController::class, 'events']);
    Route::resource('events', EventController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);

    Route::resource('Employee', EmployeeController::class);
    Route::resource('Attendance', AttendanceController::class);

    Route::get('Golongan', [GolonganController::class, 'index'])->name('golongan.index');
    Route::get('Golongan/create', [GolonganController::class, 'create'])->name('golongan.create');
    Route::post('Golongan', [GolonganController::class, 'store'])->name('golongan.store');
    Route::get('Golongan/{golongan}/edit', [GolonganController::class, 'edit'])->name('golongan.edit');
    Route::put('Golongan/{golongan}', [GolonganController::class, 'update'])->name('golongan.update');
    Route::delete('Golongan/{golongan}', [GolonganController::class, 'destroy'])->name('golongan.destroy');
    Route::get('salary-structure', [GolonganController::class, 'getSalaryStructure'])->name('salary.structure');
    Route::resource('benefit', BenefitController::class);
    Route::resource('amount', AmountController::class);
    Route::resource('leaves', \App\Http\Controllers\LeaveController::class);
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
