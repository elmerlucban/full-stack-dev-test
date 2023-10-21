<?php

namespace App\Contracts;

interface TaskWriteInterface
{
    public function create($request);
    public function update($request, $id);
}
