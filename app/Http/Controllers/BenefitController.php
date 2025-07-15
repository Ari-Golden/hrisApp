<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BenefitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $benefits = Benefit::all();
        return Inertia::render('Benefit/Index', [
            'benefits' => $benefits,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Benefit/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'jenis' => 'required|in:tunjangan,potongan',
        ]);

        Benefit::create($request->all());

        return redirect()->route('benefit.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Benefit $benefit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Benefit $benefit)
    {
        return Inertia::render('Benefit/Edit', [
            'benefit' => $benefit,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Benefit $benefit)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'jenis' => 'required|in:tunjangan,potongan',
        ]);

        $benefit->update($request->all());

        return redirect()->route('benefit.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Benefit $benefit)
    {
        $benefit->delete();

        return redirect()->route('benefit.index');
    }
}
