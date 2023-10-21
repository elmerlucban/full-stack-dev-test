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

    public function store($request)
    {
        $response = $this->task->create(['description' => $request->description]);

        return $response;
    }

    public function update($request, $id)
    {
        $response = $this->task->findOrFail($id);

        $response->is_completed = 1;
        $response->save();
        return $response;

    }
    

    public function destroy($id)
    {
        $response = $this->task->findOrFail($id);
        $response->delete();

        return response()->noContent();
    }

}
