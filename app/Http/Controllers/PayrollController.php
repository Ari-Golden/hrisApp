<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Payroll/Index');
    }

    public function taxIndex()
    {
        $employees = Employee::with('golongan.amounts.benefit')->get();
         $ptkpValues = [
            'TK/0' => 54000000,
            'TK/1' => 58500000,
            'TK/2' => 63000000,
            'TK/3' => 67500000,
            'K/0'  => 58500000,
            'K/1'  => 63000000,
            'K/2'  => 67500000,
            'K/3'  => 72000000,
        ];

        $results = $employees->map(function ($employee) use ($ptkpValues) {
            $gajiPokok = (float) ($employee->golongan->gaji ?? 0);
            $tunjangan = $employee->golongan->amounts->sum(function ($a) {
                return (float) $a->jumlah;
            });

            $potongan = 0;
            $bruto = $gajiPokok + $tunjangan;
            $biayaJabatan = min($bruto * 0.05, 500000);
            $neto = $bruto - $biayaJabatan - $potongan;
            $netoTahunan = $neto * 12;

            $status = $employee->status_pernikahan === 'menikah' ? 'K/' : 'TK/';
            $tanggungan = min($employee->jumlah_tanggungan, 3);
            $ptkpKey = $status . $tanggungan;
            $ptkpValue = $ptkpValues[$ptkpKey] ?? 0;

            $pkp = max(0, $netoTahunan - $ptkpValue);

            // Hitung PPh 21 tahunan
            $pph21 = 0;
            if ($pkp <= 60000000) {
                $pph21 = $pkp * 0.05;
            } elseif ($pkp <= 250000000) {
                $pph21 = 60000000 * 0.05 + ($pkp - 60000000) * 0.15;
            } elseif ($pkp <= 500000000) {
                $pph21 = 60000000 * 0.05 + 190000000 * 0.15 + ($pkp - 250000000) * 0.25;
            } elseif ($pkp <= 5000000000) {
                $pph21 = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + ($pkp - 500000000) * 0.3;
            } else {
                $pph21 = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + 4500000000 * 0.3 + ($pkp - 5000000000) * 0.35;
            }

            return [
                'id' => $employee->id,
                'nama' => $employee->nama,
                'gajiPokok' => $gajiPokok,
                'tunjangan' => $tunjangan,
                'potongan' => $potongan,
                'penghasilanBruto' => $bruto,
                'biayaJabatan' => $biayaJabatan,
                'penghasilanNeto' => $neto,
                'penghasilanNetoDisetahunkan' => $netoTahunan,
                'ptkpStatus' => $ptkpKey,
                'ptkpValue' => $ptkpValue,
                'penghasilanKenaPajak' => $pkp,
                'pph21TerutangTahunan' => $pph21,
                'pph21TerutangBulanan' => $pph21 / 12,
            ];
        });

        return Inertia::render('Payroll/Tax/Index', [
            'taxResults' => $results,
        ]);
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
