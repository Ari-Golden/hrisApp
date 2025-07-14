<?php

namespace App\Http\Controllers;

use App\Models\Golongan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolonganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $golongans = Golongan::all();
        return Inertia::render('Golongan/Index', [
            'golongans' => $golongans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Golongan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kode' => 'required|string|max:255|unique:golongans,kode',
            'nama' => 'required|string|max:255',
            'gaji' => 'required|numeric',
            'keterangan' => 'nullable|string',
        ]);

        Golongan::create($request->all());

        return redirect()->route('golongan.index')->with('success', 'Golongan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Golongan $golongan)
    {
        // Tidak perlu implementasi show jika tidak ada halaman detail tunggal
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Golongan $golongan)
    {
        return Inertia::render('Golongan/Edit', [
            'golongan' => $golongan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Golongan $golongan)
    {
        $request->validate([
            'kode' => 'required|string|max:255|unique:golongans,kode,' . $golongan->id,
            'nama' => 'required|string|max:255',
            'gaji' => 'required|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $golongan->update($request->all());

        return redirect()->route('golongan.index')->with('success', 'Golongan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Golongan $golongan)
    {
        $golongan->delete();

        return redirect()->route('golongan.index')->with('success', 'Golongan deleted successfully.');
    }

    /**
     * Get salary structure from Golongan data. (This method is for the SalaryStructure page, not part of resource)
     */
    public function getSalaryStructure()
    {
        $golongans = Golongan::all();
        return Inertia::render('SalaryStructure', [
            'golongans' => $golongans,
        ]);
    }
}
