<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AttendanceApiController extends Controller
{
    public function clockIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = Auth::user();
        $today = now()->toDateString();

        $existingAttendance = Attendance::where('employee_id', $user->employee->id)
            ->whereDate('date', $today)
            ->first();

        if ($existingAttendance && $existingAttendance->clock_in) {
            return response()->json(['message' => 'You have already clocked in today.'], 400);
        }

        $attendance = Attendance::create([
            'employee_id' => $user->employee->id,
            'date' => $today,
            'clock_in' => now(),
            'clock_in_latitude' => $request->latitude,
            'clock_in_longitude' => $request->longitude,
        ]);

        return response()->json(['message' => 'Clock in successful.', 'attendance' => $attendance], 201);
    }

    public function clockOut(Request $request)
    {
        $validator = Validator->make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = Auth::user();
        $today = now()->toDateString();

        $attendance = Attendance::where('employee_id', $user->employee->id)
            ->whereDate('date', $today)
            ->first();

        if (!$attendance) {
            return response()->json(['message' => 'You have not clocked in today.'], 400);
        }

        if ($attendance->clock_out) {
            return response()->json(['message' => 'You have already clocked out today.'], 400);
        }

        $attendance->update([
            'clock_out' => now(),
            'clock_out_latitude' => $request->latitude,
            'clock_out_longitude' => $request->longitude,
        ]);

        return response()->json(['message' => 'Clock out successful.', 'attendance' => $attendance], 200);
    }
}