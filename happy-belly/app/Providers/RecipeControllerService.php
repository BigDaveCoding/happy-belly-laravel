<?php

namespace App\Providers;

use App\Http\Requests\CreateRecipeRequest;
use App\Models\Ingredient;
use App\Models\Recipe;


class RecipeControllerService
{
    static public function addIngredients(array $ingredientData, Recipe $recipe) : void
    {
        $ingredientNames = $ingredientData['ingredient_name'];
        $ingredientQuantity = $ingredientData['ingredient_quantity'];
        $ingredientUnit = $ingredientData['ingredient_unit'];
        $ingredientAllergen = $ingredientData['ingredient_allergen'];

        foreach ($ingredientNames as $index => $ingredientName) {

            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientName,
                'food_group' => 'food_group', // static value
                'allergen' => $ingredientAllergen[$index]]);

            $recipe->ingredients()->attach($ingredient, [
                'quantity' => $ingredientQuantity[$index],
                'unit' => $ingredientUnit[$index],
            ]);
        }
    }

    static public function addCookingInstructions(array $cookingInstructionData, Recipe $recipe) : void
    {
        $cookingInstructions = $cookingInstructionData['cooking_instruction'];

        foreach ($cookingInstructions as $index => $instruction) {
            $recipe->cookingInstructions()->create([
                'step' => $index + 1,
                'instruction' => $instruction,
            ]);
        }
    }

    static public function createRecipe(array $recipeData, int $userId) : Recipe
    {

        $recipe = new Recipe;
        $recipe->name = $recipeData['recipe_name'];
        $recipe->description = $recipeData['recipe_description'];
        $recipe->image = 'https://placehold.co/600x400'; // static value
        $recipe->cooking_time = $recipeData['recipe_cooking_time'];
        $recipe->serves = $recipeData['recipe_serves'];
        $recipe->user_id = $userId;

        $recipe->save();

        return $recipe;
    }
}

