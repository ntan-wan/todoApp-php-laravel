<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{

    // read
    public function index() {
        $tasks = Task::all();
        $res = ['status' => 'success', 'data' => $tasks];

        return TaskResource::collection($tasks);
    }
    public function show(Task $task) {
        return TaskResource::make($task);
    }

    // create
    public function store(Request $request) {
        $task = Task::create([
            'description' => $request->description,
            'is_done' => false
        ]);

        return TaskResource::make($task);
    }
}
