<?php

namespace App\Http\Controllers;

use App\Models\CookingInstruction;
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

        $recipe = new Recipe();
        $recipe->name = $request['recipe_name'];
        $recipe->description = $request['recipe_description'];
        $recipe->image = 'https://placehold.co/600x400';
        $recipe->cooking_time = $request['recipe_cooking_time'];
        $recipe->serves = $request['recipe_serves'];
        $recipe->user_id = $userId;
        $recipe->save();

        $ingredientNames = $request->input('ingredient_name');
        $ingredientQuantity = $request->input('ingredient_quantity');
        $ingredientUnit = $request->input('ingredient_unit');
        $ingredientAllergen = $request->input('ingredient_allergen');

        foreach ($ingredientNames as $index => $ingredientName) {

            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientName,
                'food_group' => 'food_group',
                'allergen' => $ingredientAllergen[$index],]);

            $recipe->ingredients()->attach($ingredient, [
                'quantity' => $ingredientQuantity[$index],
                'unit' => $ingredientUnit[$index]
            ]);
        }

        $cookingInstructions = $request->input('cooking_instruction');

        foreach ($cookingInstructions as $index => $instruction) {
            $recipe->cookingInstructions()->create([
                'step' => $index + 1,
                'instruction' => $instruction
            ]);
        }

        return redirect('/recipes');
    }
}
