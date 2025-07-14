<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

use App\Http\Controllers\Api\EmployeeController;

// Route untuk mendapatkan user yang login (hanya jika sudah autentikasi Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

// Route untuk login dan mendapatkan token Sanctum
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    // Beri token untuk mobile app / Postman
    return response()->json([
        'token' => $user->createToken('mobile')->plainTextToken,
        'user' => $user
    ]);
})->name('api.login');

// Semua route setelah login akan masuk sini
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/employees', [EmployeeController::class, 'index']);

    // Attendance API routes
    Route::post('/attendance/clock-in', [App\Http\Controllers\Api\AttendanceApiController::class, 'clockIn']);
    Route::post('/attendance/clock-out', [App\Http\Controllers\Api\AttendanceApiController::class, 'clockOut']);
});
