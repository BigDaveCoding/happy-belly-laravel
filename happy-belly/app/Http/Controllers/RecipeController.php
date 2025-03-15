<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function all()
    {
        return Recipe::all();
    }

    public function create(Request $request)
    {
        $recipe = new Recipe();


    }
}
