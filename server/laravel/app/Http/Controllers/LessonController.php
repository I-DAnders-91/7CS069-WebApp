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
        $jsonPath = storage_path('app/lessons/lessons.json');
        if (!file_exists($jsonPath)) {
            return response()->json(['data' => []]);
        }
        $json = file_get_contents($jsonPath);
        $lessons = json_decode($json, true) ?? [];
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

    // Update a lesson by ID
    public function update(Request $request, $id) {
        $data = $request->validate([
            'objective' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'year_group' => 'required|string|max:255',
            'date' => 'nullable|string|max:255',
            'success_criteria' => 'nullable|string|max:255',
            'activities' => 'nullable|string',
            'useful_links' => 'nullable|array',
            'useful_links.*' => 'string|max:255',
        ]);

        $all = $this->readAll();
        $index = null;
        foreach ($all as $i => $lesson) {
            if ((string)$lesson['id'] === (string)$id) {
                $index = $i;
                break;
            }
        }
        if ($index === null) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        // Keep same id, update timestamp
        $lesson = array_merge($all[$index], $data, [
            'updated_at' => now()->toISOString(),
        ]);

        $all[$index] = $lesson;
        $this->writeAll($all);

        return response()->json($lesson); // 200 OK
    }
}