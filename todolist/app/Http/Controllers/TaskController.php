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
            'deadline' => $request->deadline
        ]);

        return response()->json([
            'message' => 'Task Created',
            'data' => $request
        ], 200);
    }

 public function updateTasks(Request $request, $userId)
{
    $id = $request->id;


    $task = TaskModel::where('id', $id)
                     ->where('user_id', $userId)
                     ->first();

    if (!$task) {
        return response()->json(['message' => 'Task not found'], 404);
    }


    $task->update([
        'title' => $request->title,
        'description' => $request->description,
        'is_completed' => $request->is_completed,
        'task_status' => $request->task_status,
        'priority' => $request->priority,
        'deadline' => $request->deadline
    ]);

    return response()->json(['message' => 'Task updated successfully']);
}

    public function fetchTasks(Request $request, $id)
    {
        $taskstatus = $request->query('task_status');
        $orderby = $request->query('orderby');
        $priority = $request->query('priority');
        $perPage =  $request->query('perPage');
        $page = $request->query('page');
        $search = $request->query('search');

        $tasks = TaskModel::where('user_id', $id)
            ->when($taskstatus, function ($query, $taskstatus) {
                return $query->where('task_status', $taskstatus);
            })->when($priority, function ($query) use ($priority) {
                if ($priority !== "all") {
                    return $query->where('priority', $priority);
                }
            })->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%$search%")
                        ->orWhere('description', 'like', "%$search%");
                });
            })
            ->orderBy('created_at', $orderby)
            ->paginate($perPage, ['*'], 'page', $page);


        return response()->json($tasks);
    }

    public function fetchInProg(Request $request, $id)
    {
        $inprog = TaskModel::where('user_id', $id)->where('task_status', "IN PROGRESS")->get();
        return response()->json($inprog);
    }


    public function progPercent($id)
    {
        $inprog = TaskModel::where('user_id', $id)
            ->where('task_status', "IN PROGRESS")
            ->count();

        $total = TaskModel::where('user_id', $id)->count();

        if ($total === 0) {
            return response()->json([
                'percent' => 0,
                'in_progress' => 0,
                'total' => 0
            ]);
        }

        $percent = ($inprog / $total) * 100;

        return response()->json([
            'percent' => (int) round($percent),
            'in_progress' => $inprog,
            'total' => $total
        ]);
    }




    
}
