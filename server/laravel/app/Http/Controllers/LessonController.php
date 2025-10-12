<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(\App\Http\Requests\StoreLessonRequest $req) {
        $lesson = \App\Models\Lesson::create($req->validated());
        return response()->json($lesson, 201);
    }
}
