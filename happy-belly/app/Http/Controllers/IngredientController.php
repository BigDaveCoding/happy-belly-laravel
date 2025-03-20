<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function create(Request $request)
    {
        $ingredientNames = $request->input('ingredient_name');
        foreach ($ingredientNames as $ingredientName) {

            $ingredient = new Ingredient;

            $ingredient->name = $ingredientName;
            $ingredient->food_group = 'food_group';
            $ingredient->allergen = 0;

            $ingredient->save();

        }

        $ingredientQuantities = $request->input('ingredient_quantity');

    }
}
