<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function create(Request $request)
    {
        $ingredient = new Ingredient();

        $ingredient->name = $request->input('ingredient_name');
        $ingredient->food_group = 'food_group';
        $ingredient->allergen = 0;
        $ingredient->save();

    }
}
