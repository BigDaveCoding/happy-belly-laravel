<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
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
        $userId = Auth::id();

        $validatedData = $request->validate([
            'recipe_name' => 'required|string|max:255',
            'recipe_description' => 'required|string',
//            'recipe_image' => 'nullable|url',
            'recipe_cooking_time' => 'required|integer|min:1',
            'recipe_serves' => 'required|integer|min:1',
        ]);

        $recipe = new Recipe();
        $recipe->name = $validatedData['recipe_name'];
        $recipe->description = $validatedData['recipe_description'];
        $recipe->image = 'https://placehold.co/600x400';
        $recipe->cooking_time = $validatedData['recipe_cooking_time'];
        $recipe->serves = $validatedData['recipe_serves'];
        $recipe->user_id = $userId;
        // response
        $recipe->save();

        $ingredientNames = $request->input('ingredient_name');
        $ingredientQuantity = $request->input('ingredient_quantity');
        $ingredientUnit = $request->input('ingredient_unit');
//        dd($ingredientNames, $ingredientQuantity, $ingredientUnit);

        foreach ($ingredientNames as $index => $ingredientName) {

            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientName,
                'food_group' => 'food_group',
                'allergen' => 0]);

            $recipe->ingredients()->attach($ingredient, [
                'quantity' => $ingredientQuantity[$index],
                'unit' => $ingredientUnit[$index]
            ]);
        }

        return redirect('/recipes');
    }
}
