<?php

namespace App\Repositories;

use App\Contracts\TaskWriteInterface;
use App\Models\Task;

class TaskWriteRepository implements TaskWriteInterface
{
    private $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function create($request)
    {
        $response = $this->task->create(['name' => $request->name]);

        return $response;
    }

    public function update($request, $id)
    {
        $response = $this->task->findOrFail($id);

        $response->update(['name' => $request->name]);
        return $response;

    }

}
