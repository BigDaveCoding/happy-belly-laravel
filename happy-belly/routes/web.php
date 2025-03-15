<?php

use App\Http\Controllers\RecipeController;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
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

Route::middleware(['auth'])->group(function () {
    Route::get('/recipes', function () {

        $recipes = Recipe::all();
        $adminRecipes = Recipe::where('user_id', 1)->get();
        $userRecipes = Recipe::where('user_id', Auth::id())->get();

        return Inertia::render('recipes', [
            'recipes' => $recipes,
            'adminRecipes' => $adminRecipes,
            'userRecipes' => $userRecipes,
            'user_id' => Auth::id()
        ]);
    })->name('recipes');
});

Route::get('/singleRecipe/{id}', function ($id) {

    $recipe = Recipe::with('ingredients', 'cookingInstructions:recipe_id,step,instruction')->findOrFail($id); // Fetch the recipe by ID

    return Inertia::render('singleRecipe', [
        'recipe' => $recipe, // Passing data as a prop
    ]);
})->name('singleRecipe');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
