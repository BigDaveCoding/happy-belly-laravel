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
            'adminRecipes' => $adminRecipes,
            'userRecipes' => $userRecipes,
            'userId' => Auth::id()
        ]);
    })->name('recipes');
});

Route::get('/singleRecipe/{id}', function ($id) {

    $recipe = Recipe::with('ingredients', 'cookingInstructions:recipe_id,step,instruction')->findOrFail($id); // Fetch the recipe by ID

    return Inertia::render('singleRecipe', [
        'recipe' => $recipe, // Passing data as a prop
        'userId' => Auth::id()
    ]);
})->name('singleRecipe');



Route::get('/recipe/add', function() {

    $userId = Auth::id();
    return Inertia::render('addRecipe', [
        'userId' => $userId
    ]);
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
