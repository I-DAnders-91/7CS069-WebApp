<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreLessonRequest;

class LessonController extends Controller
{
    protected function jsonPath() {
        return storage_path('app/lessons/lessons.json');
    }

    protected function readAll() {
        $jsonPath = $this->jsonPath();
        if (!file_exists($jsonPath)) {
            return [];
        }
        $json = file_get_contents($jsonPath);
        return json_decode($json, true) ?: [];
    }

    protected function writeAll($lessons) {
        $jsonPath = $this->jsonPath();
        file_put_contents($jsonPath, json_encode($lessons, JSON_PRETTY_PRINT));
    }

    public function index()
    {
        $lessons = $this->readAll();
        return response()->json(['data' => $lessons]);
    }

    // Store a new lesson
    public function store(StoreLessonRequest $request) {
        $data = $request->validated();
        $lessons = $this->readAll();

        // Generate a new ID
        $data['id'] = count($lessons) ? max(array_column($lessons, 'id')) + 1 : 1;

        $lessons[] = $data;
        $this->writeAll($lessons);

        return response()->json($data, 201);
    }

    // Show a specific lesson by ID
    public function show($id) {
        $lessons = $this->readAll();
        foreach ($lessons as $lesson) {
            if ((string)$lesson['id'] === (string)$id) {
                return response()->json($lesson);
            }
        }
        return response()->json(['error' => 'Lesson not found'], 404);
    }

    // Delete a lesson by ID
    public function destroy($id) {
        $lessons = $this->readAll();
        $index = null;
        foreach ($lessons as $i => $lesson) {
            if ((string)$lesson['id'] === (string)$id) {
                $index = $i;
                break;
            }
        }
        if ($index !== null) {
            array_splice($lessons, $index, 1);
            $this->writeAll($lessons);
            return response()->noContent(); // 204 No Content
        }
        return response()->json(['message' => 'Lesson not found'], 404);
    }
}