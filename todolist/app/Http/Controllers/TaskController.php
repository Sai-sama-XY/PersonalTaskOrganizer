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

    public function updateTasks(Request $request, $id, $userId)
    {
        TaskModel::update([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'is_completed' => $request->is_completed,
            'task_status' => $request->task_status,
            'priority' => $request->priority,
            'deadline' => $request->deadline
        ]);
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
}
