<?php

namespace App\Contracts;

interface TaskWriteInterface
{
    public function store($request);
    public function update($request, $id);
}
