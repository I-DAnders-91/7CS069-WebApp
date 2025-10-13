<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonController;

Route::get('/lessons', [LessonController::class, 'index']); // Lists all lessons
Route::get('/lessons/{id}', [LessonController::class, 'show']); // Shows a specific lesson
Route::post('/lessons', [LessonController::class, 'store']); // Creates a new lesson
Route::put('/lessons/{id}', [LessonController::class, 'update']); // Updates a specific lesson
Route::delete('/lessons/{id}', [LessonController::class, 'destroy']); // Deletes a specific lesson
