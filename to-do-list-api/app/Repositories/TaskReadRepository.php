<?php

namespace App\Repositories;

use App\Contracts\TaskReadInterface;
use App\Models\Task;

class TaskReadRepository implements TaskReadInterface
{
    private $task;
    private $defaultLimit = 10;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function index($request)
    {
        return $this->task->paginate(
            (int) $request->get('limit') > 0 ? (int) $request->get('limit') : $this->defaultLimit
        );
    }

    public function show($id)
    {
        return $this->task->findOrFail($id);
    }

}
