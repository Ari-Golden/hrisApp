<?php

namespace App\Http\Controllers;

use App\Models\Amount;
use App\Models\Benefit;
use App\Models\Golongan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $amounts = Amount::with(['benefit', 'golongan'])->get();
        return Inertia::render('Amount/Index', [
            'amounts' => $amounts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $benefits = Benefit::all();
        $golongans = Golongan::all();
        return Inertia::render('Amount/Create', [
            'benefits' => $benefits,
            'golongans' => $golongans,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'benefit_id' => 'required|exists:benefits,id',
            'golongan_id' => 'required|exists:golongans,id',
            'jumlah' => 'required|numeric|min:0',
        ]);

        Amount::create($request->all());

        return redirect()->route('amount.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Amount $amount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amount $amount)
    {
        $benefits = Benefit::all();
        $golongans = Golongan::all();
        return Inertia::render('Amount/Edit', [
            'amount' => $amount->load(['benefit', 'golongan']),
            'benefits' => $benefits,
            'golongans' => $golongans,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Amount $amount)
    {
        $request->validate([
            'benefit_id' => 'required|exists:benefits,id',
            'golongan_id' => 'required|exists:golongans,id',
            'jumlah' => 'required|numeric|min:0',
        ]);

        $amount->update($request->all());

        return redirect()->route('amount.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amount $amount)
    {
        $amount->delete();

        return redirect()->route('amount.index');
    }
}
