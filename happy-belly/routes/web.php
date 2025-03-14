<?php

use App\Http\Controllers\RecipeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// creating API with recipe data to localhost:8000/recipeData
Route::get('/recipeData', [RecipeController::class, 'all']);

Route::get('/recipes', function () {
    return Inertia::render('recipes');
})->name('recipes');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
