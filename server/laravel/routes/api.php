<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonController;

Route::get('/lessons', [LessonController::class, 'index']); // Lists all lessons
Route::get('/lessons/{id}', [LessonController::class, 'show']); // Shows a specific lesson
Route::post('/lessons', [LessonController::class, 'store']);
Route::delete('/lessons/{id}', [LessonController::class, 'destroy']);
