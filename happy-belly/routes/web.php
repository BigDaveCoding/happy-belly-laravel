<?php

use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage',[
        'userId' => Auth::id()
    ]);
})->name('home');

//Route::middleware(['auth', 'verified'])->group(function () {
//    Route::get('dashboard', function () {
//        return Inertia::render('dashboard');
//    })->name('dashboard');
//});

Route::middleware(['auth'])->group(function () {
    Route::get('/recipes', [RecipeController::class, 'recipesPage']);
    Route::get('/singleRecipe/{recipe}', [RecipeController::class, 'singleRecipe']);
    Route::get('/recipe/add', [RecipeController::class, 'addRecipePage']);
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::post('/recipe/add', [RecipeController::class, 'create']);
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/recipe/edit/{id}', function ($id) {
        return Inertia::render('editRecipe', [
            'userId' => Auth::id(),
            'recipe' => Recipe::with('ingredients', 'cookingInstructions')->findOrFail($id)
        ]);
    });
});



Route::get('/debug-csrf', function () {
    return response()->json([
        'csrf_token' => csrf_token(),
        'session_id' => session()->getId()
    ]);
});

Route::get('/get-csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
