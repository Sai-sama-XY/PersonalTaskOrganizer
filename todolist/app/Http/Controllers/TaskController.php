<?php

namespace App\Http\Controllers;

use App\Models\TaskModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{

public function addTasks(Request $request){

    TaskModel::create([
        'user_id'=>$request->user_id,
        'title'=>$request->title,
        'description' =>$request->description,
        'is_completed'=>$request->is_completed
    ]);
    
    return response()->json([
        'message'=>'Task Created'
    ],200);
}

public function fetchTasks(Request $request, $id)
{
    $tasks = TaskModel::where('user_id',$id)->get();

    return response()->json($tasks);
}

}
