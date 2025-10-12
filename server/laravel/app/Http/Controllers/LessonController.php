<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreLessonRequest;


class LessonController extends Controller
{
    // Read all lessons from JSON file
    protected function readAll() {
        $jsonPath = storage_path('app/lessons/lessons.json');
        if (!file_exists($jsonPath)) {
            return [];
        }
        $json = file_get_contents($jsonPath);
        return json_decode($json, true) ?: [];
    }

    // Write all lessons to JSON file
    protected function writeAll($lessons) {
        $jsonPath = storage_path('app/lessons/lessons.json');
        file_put_contents($jsonPath, json_encode($lessons, JSON_PRETTY_PRINT));
    }
    public function index() {
        $lessons = \App\Models\Lesson::all();
        return response()->json($lessons);
    }

    // Store a new lesson
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

    // Show a specific lesson by ID
    public function show($id) {
        $lesson = \App\Models\Lesson::find($id);
        if (!$lesson) {
            return response()->json(['error' => 'Lesson not found'], 404);
        }
        return response()->json($lesson);
    }

    // Delete a lesson by ID
    public function destroy($id) {
        // Delete from database
        $lesson = \App\Models\Lesson::find($id);
        if ($lesson) {
            $lesson->delete();
        }

        // Delete from JSON file
        $all = $this->readAll();
        $index = null;
        foreach ($all as $i => $l) {
            if ((string)$l['id'] === (string)$id) {
                $index = $i;
                break;
            }
        }
        if ($index !== null) {
            array_splice($all, $index, 1);
            $this->writeAll($all);
        }

        // If neither found, return not found
        if (!$lesson && $index === null) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        return response()->noContent(); // 204 No Content
    }
}
