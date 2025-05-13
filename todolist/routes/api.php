<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Public Routes
Route::post('/createUser',[UserController::class, 'createUser']);
Route::post('/loginUser',[UserController::class, 'login']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Task CRUD
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/fetchTasks/{id}', [TaskController::class, 'fetchTasks']);
    Route::post('/addTasks', [TaskController::class, 'addTasks']);
});


