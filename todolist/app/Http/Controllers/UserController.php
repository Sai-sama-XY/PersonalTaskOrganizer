<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function createUser(Request $request){
        $user = User::create([
            'name'=> $request->name,
            'email'=>$request->email,
            'password'=>$request->password,
        ]);    

        return response()->json([
            'message'=>'User Created Successfully',
            'user'=> $user
        ],200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('todolist')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token'=> $token,
                'user'=>$user
            ], 200);
        } else {
            return response()->json([
                'message' => 'Invalid credentials',
                
            ], 401);
        }
    }
}
