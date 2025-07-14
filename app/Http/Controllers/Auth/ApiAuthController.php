<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            
            'nama'=>'required',           
            
            ]   
        );

        if($validator->fails()){
            return response()->json([
                'satus'=>false,
                'massage'=>'validasi error',
                'errors'=> $validator->errors(),
            ],422);
        }
        $user = Employee::create($request->all());
        return response()->json ([
            'status'=>true,
            'massage'=>'data berhasil dimasukkan',
            'data'=> $user

        ],201
        );
    }
}