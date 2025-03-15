<?php

namespace App\Http\Controllers;

use App\Models\CookingInstruction;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function all()
    {
        return Recipe::all();
    }

    protected $fillable = [
        'recipe_name',
        'recipe_description',
        'recipe_image',
        'recipe_cooking_time',
        'recipe_serves',
        'user_id',
    ];

    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_name' => 'required|string|max:255',
            'recipe_description' => 'required|string',
            'recipe_image' => 'nullable|url',
            'recipe_cooking_time' => 'required|integer|min:1',
            'recipe_serves' => 'required|integer|min:1',
            'ingredients' => 'required|array',
            'ingredients.*.name' => 'required|string|max:255',
            'ingredients.*.food_group' => 'nullable|string|max:255',
            'ingredients.*.allergen' => 'boolean',
            'ingredients.*.quantity' => 'required|numeric|min:0.01',
            'ingredients.*.unit' => 'nullable|string|max:50',
            'cooking_steps' => 'required|array',
            'cooking_steps.*.instruction' => 'required|string',
        ]);

        // Create Recipe
        $recipe = Recipe::create([
            'recipe_name' => $validated['recipe_name'],
            'recipe_description' => $validated['recipe_description'],
            'recipe_image' => $validated['recipe_image'] ?? null,
            'recipe_cooking_time' => $validated['recipe_cooking_time'],
            'recipe_serves' => $validated['recipe_serves'],
            'user_id' => auth()->id(),
        ]);

        // Create Ingredients and link with pivot table
        foreach ($validated['ingredients'] as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate([
                'name' => $ingredientData['name'],
            ], [
                'food_group' => $ingredientData['food_group'] ?? null,
                'allergen' => $ingredientData['allergen'] ?? false,
            ]);

            // Attach ingredient with pivot table data
            $recipe->ingredients()->attach($ingredient->id, [
                'quantity' => $ingredientData['quantity'],
                'unit' => $ingredientData['unit'],
            ]);
        }

        // Create Cooking Steps
        foreach ($validated['cooking_steps'] as $stepData) {
            CookingInstruction::create([
                'recipe_id' => $recipe->id,
                'step' => $stepData['step'],
                'instruction' => $stepData['instruction'],
            ]);
        }

        return redirect()->route('recipes')->with('success', 'Recipe added successfully!');
    }
}
