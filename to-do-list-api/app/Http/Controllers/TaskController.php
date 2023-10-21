<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Repositories\TaskWriteRepository;
use App\Traits\ResponseFormatter;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    use ResponseFormatter;

    private $taskWrite;

    public function __construct(TaskWriteRepository $taskWrite)
    {
        $this->taskWrite = $taskWrite;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(TaskRequest $request)
    {
        try {
            $response = $this->taskWrite->create($request);

            return $this->success(new TaskResource($response),'Success', Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
