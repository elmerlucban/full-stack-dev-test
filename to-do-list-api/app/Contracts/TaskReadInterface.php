<?php

namespace App\Contracts;

interface TaskReadInterface
{
    public function index($request);
    public function show($id);
}
