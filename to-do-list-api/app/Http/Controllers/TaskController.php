<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Repositories\TaskReadRepository;
use App\Repositories\TaskWriteRepository;
use App\Traits\ResponseFormatter;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    use ResponseFormatter;

    private $taskWrite;
    private $taskRead;

    public function __construct(TaskWriteRepository $taskWrite, TaskReadRepository $taskRead)
    {
        $this->taskWrite = $taskWrite;
        $this->taskRead  = $taskRead;
    }

    /**
     * View all of the items in the to-do list.
     */
    public function index(Request $request)
    {
        try {
            $response = $this->taskRead->index($request);

            return (new TaskCollection($response))->additional([
                'code'    => 200,
                'message' => 'Success',
            ]);

        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    /**
     * Add an item to the list
     */
    public function store(TaskRequest $request)
    {
        try {
            $response = $this->taskWrite->store($request);

            return $this->success(new TaskResource($response),'Success', Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($task)
    {
        try {
            $response = $this->taskRead->show($task);

            return $this->success(new TaskResource($response));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

  
    /**
     * Mark an item from the list as complete
     */
    public function update(Request $request, $task)
    {
        try {
            $response = $this->taskWrite->update($request, $task);

            return $this->success(new TaskResource($response),'Success', Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    /**
     * Remove an item from the list
     */
    public function destroy($task)
    {
        try {
            $this->taskWrite->destroy($task);

            return response()->noContent();
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }
}
