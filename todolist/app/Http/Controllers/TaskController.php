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
            'task_status' => $request->task_status
        ]);

        return response()->json([
            'message' => 'Task Created',
            'data' => $request
        ], 200);
    }
    public function fetchTasks(Request $request, $id)
    {
        $taskstatus = $request->query('task_status');
        $tasks = TaskModel::where('user_id', $id)
            ->when($taskstatus, function ($query, $taskstatus) {
                return $query->where('task_status', $taskstatus);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($tasks);
    }
}
