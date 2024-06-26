<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{

    // read
    public function index()
    {
        $tasks = Task::latest()->get();

        return new TaskCollection($tasks);
    }
    public function show(Task $task)
    {
        return TaskResource::make($task);
    }

    // create
    public function store(StoreTaskRequest $request)
    {

        $task = Task::create($request->validated());

        return TaskResource::make($task);
    }

    //delete
    public function destroy(Task $task)
    {
        $task->delete();
        $res = [
            'msg' => 'success'
        ];

        return response()->json($res);
    }

    //edit
    public function update(StoreTaskRequest $request, Task $task) {
        $task->update($request->validated());

        return TaskResource::make($task);
    }
}
