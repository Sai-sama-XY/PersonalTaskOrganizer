<?php

namespace App\Http\Controllers;

use App\Models\TaskModel;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function addTasks(Request $request)
    {
        TaskModel::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'is_completed' => $request->is_completed,
            'task_status' => $request->task_status,
            'priority' => $request->priority,
            'deadline'=>$request->deadline
        ]);

        return response()->json([
            'message' => 'Task Created',
            'data' => $request
        ], 200);
    }
    public function fetchTasks(Request $request, $id)
    {
        $taskstatus = $request->query('task_status');
        $orderby = $request->query('orderby');
        $priority = $request->query('priority');
        
        $tasks = TaskModel::where('user_id', $id)
            ->when($taskstatus, function ($query, $taskstatus) {
                return $query->where('task_status', $taskstatus);
            }) ->when($priority, function ($query) use ($priority) {
            return $query->where('priority', $priority);
        })
            ->orderBy('created_at', $orderby)
            ->get();
        

        return response()->json($tasks);
    }
}
