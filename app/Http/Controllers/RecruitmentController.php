<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecruitmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stats = [
            'totalApplicants' => Candidate::count(),
            'totalPositions' => Candidate::distinct('position')->count('position'),
            'totalSorted' => Candidate::where('status', 'shortlisted')->count(),
            'totalByStage' => [
                'screening' => Candidate::where('status', 'pending')->count(),
                'interview' => Candidate::where('status', 'interview')->count(),
                'offering' => 0, // Assuming no 'offering' status in the new model
                'rejected' => Candidate::where('status', 'rejected')->count(),
            ],
            'totalJoined' => 0, // Assuming no 'joined' status in the new model
        ];

        return Inertia::render('Recruitment/Index',
         [
            'stats' => $stats,
            'candidates' => Candidate::all(),
        ]
    );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
