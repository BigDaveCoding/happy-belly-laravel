<?php

use App\Http\Controllers\RecipeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage', [
        'userId' => Auth::id(),
    ]);
})->name('home');

 Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
 });

Route::middleware(['auth', 'verified', 'web'])->group(function () {
    Route::controller(RecipeController::class)->group(function () {
        Route::get('/recipes', 'recipesPage');
        Route::get('/singleRecipe/{recipe}', 'singleRecipePage');
        Route::get('/recipe/add', 'addRecipePage');
        Route::get('/recipe/edit/{recipe}', 'editRecipePage');
        Route::post('/recipe/add', 'create');
        Route::patch('/recipe/edit/{recipe}', 'editRecipe');
    });
});

Route::get('/debug-csrf', function () {
    return response()->json([
        'csrf_token' => csrf_token(),
        'session_id' => session()->getId(),
    ]);
});

Route::get('/get-csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token(),
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
