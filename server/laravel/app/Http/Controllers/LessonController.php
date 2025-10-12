<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreLessonRequest;


class LessonController extends Controller
{
    public function index() {
        $lessons = \App\Models\Lesson::all();
        return response()->json($lessons);
    }
    public function store(StoreLessonRequest $request) {
        $data = $request->validated();
        // Store the lesson in the database
        $lesson = \App\Models\Lesson::create($data);

        // Also append lesson data to lessons.json
        $jsonPath = storage_path('app/lessons/lessons.json');
        $lessons = [];
        if (file_exists($jsonPath)) {
            $json = file_get_contents($jsonPath);
            $lessons = json_decode($json, true) ?: [];
        }
        $lessons[] = $lesson->toArray();
        file_put_contents($jsonPath, json_encode($lessons, JSON_PRETTY_PRINT));

        return response()->json($lesson, 201);
    }
    public function show($id) {
        $lesson = \App\Models\Lesson::find($id);
        if (!$lesson) {
            return response()->json(['error' => 'Lesson not found'], 404);
        }
        return response()->json($lesson);
    }
}
