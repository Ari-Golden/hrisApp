<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RecruitmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Data dummy
        $stats = [
            'totalApplicants' => 150,
            'totalPositions' => 12,
            'totalSorted' => 90,
            'totalByStage' => [
                'screening' => 40,
                'interview' => 30,
                'offering' => 10,
                'rejected' => 10,
            ],
            'totalJoined' => 25,
        ];
         $candidates = [
            [
                'id' => 1,
                'name' => 'Ayu Rahma',
                'position' => 'Frontend Developer',
                'status' => 'shortlisted',
                'appliedAt' => '2025-06-20',
            ],
            [
                'id' => 2,
                'name' => 'Rizky Pratama',
                'position' => 'UI/UX Designer',
                'status' => 'interview',
                'appliedAt' => '2025-06-19',
            ],
            [
                'id' => 3,
                'name' => 'Siti Aminah',
                'position' => 'Backend Engineer',
                'status' => 'pending',
                'appliedAt' => '2025-06-18',
            ],
            [
                'id' => 4,
                'name' => 'Daniel Mahendra',
                'position' => 'Data Analyst',
                'status' => 'rejected',
                'appliedAt' => '2025-06-15',
            ],
            [
                'id' => 5,
                'name' => 'Yusuf Hidayat',
                'position' => 'QA Tester',
                'status' => 'shortlisted',
                'appliedAt' => '2025-06-17',
            ],
            [
                'id' => 6,
                'name' => 'Nurul Aini',
                'position' => 'Mobile App Developer',
                'status' => 'interview',
                'appliedAt' => '2025-06-14',
            ],
        ];
        return Inertia::render('Recruitment/Index',
         [
            'stats' => $stats,
            'candidates' => $candidates,
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
