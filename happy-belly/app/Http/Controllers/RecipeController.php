<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function all()
    {
        return Recipe::all();
    }

    public function create(Request $request)
    {

        $validatedData = $request->validate([
            'recipe_name' => 'required|string|max:255',
            'recipe_description' => 'required|string',
            'recipe_image' => 'nullable|url',
            'recipe_cooking_time' => 'required|integer|min:1',
            'recipe_serves' => 'required|integer|min:1',
        ]);

        $recipe = new Recipe();
        $recipe->name = $validatedData['recipe_name'];
        $recipe->description = $validatedData['recipe_description'];
        $recipe->image = $validatedData['recipe_image'] ?? null;
        $recipe->cooking_time = $validatedData['recipe_cooking_time'];
        $recipe->serves = $validatedData['recipe_serves'];
        $recipe->user_id = Auth::id();
        // response
        $recipe->save();

        return response()->json($recipe);
    }
}
