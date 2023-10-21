<?php

namespace App\Repositories;

use App\Contracts\TaskReadInterface;
use App\Models\Task;

class TaskReadRepository implements TaskReadInterface
{
    private $task;
    private $defaultLimit = 100;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function index($request)
    {
        if ($request->has('sort_by')) {
            $task = $this->task->orderBy($request->sort_by, $request->sort_order ?? 'ASC');
        } else {
            $task = $this->task->orderBy('created_at', 'DESC');
        }


        return $task->paginate(
            (int) $request->get('limit') > 0 ? (int) $request->get('limit') : $this->defaultLimit
        );
    }

    public function show($id)
    {
        return $this->task->findOrFail($id);
    }

}
