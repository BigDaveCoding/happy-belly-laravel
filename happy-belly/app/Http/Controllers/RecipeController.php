<?php

namespace App\Http\Controllers;

use App\Models\CookingInstruction;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function all()
    {
        return Recipe::all();
    }

    public function recipesPage()
    {
        $adminRecipes = $this->adminRecipes();
        $userRecipes = $this->userRecipes();
        return Inertia::render('recipes', [
            'adminRecipes' => $adminRecipes,
            'userRecipes' => $userRecipes,
            'userId' => Auth::id()
        ]);
    }

    public function adminRecipes()
    {
        return Recipe::where('user_id', 1)->get();
    }

    public function userRecipes()
    {
        return Recipe::where('user_id', Auth::id())->get();
    }

    public function singleRecipePage(Recipe $recipe)
    {
        $recipe->load('ingredients', 'cookingInstructions:recipe_id,step,instruction');
        return Inertia::render('singleRecipe', [
            'recipe' => $recipe,
            'userId' => Auth::id()
        ]);
    }

    public function addRecipePage()
    {
        return Inertia::render('addRecipe',[
            'userId' => Auth::id(),
        ]);
    }

    public function editRecipePage(Recipe $recipe)
    {
        $recipe->load('ingredients', 'cookingInstructions');
        return Inertia::render('editRecipe', [
            'recipe' => $recipe,
            'userId' => Auth::id()
        ]);
    }

    public function create(Request $request)
    {
//        dd($userId);
//        dd($request->all());
        $userId = Auth::id();

        $validatedData = $request->validate([
            'recipe_name' => 'required|string|max:255|min:4',
            'recipe_description' => 'required|string|min:10',
            'recipe_cooking_time' => 'required|string|numeric|min:1',
            'recipe_serves' => 'required|integer|numeric|min:1',
            'ingredient_name' => 'required|array',
            'ingredient_name.*' => 'required|string',
            'ingredient_quantity' => 'required|array',
            'ingredient_quantity.*' => 'required|integer|min:1',
            'ingredient_unit' => 'required|array',
            'ingredient_unit.*' => 'nullable|string',
            'ingredient_allergen' => 'required|array',
            'ingredient_allergen.*' => 'required|boolean',
            'cooking_instruction' => 'required|array',
            'cooking_instruction.*' => 'required|string',
        ]);

//        dd($validatedData);

        $recipe = new Recipe();
        $recipe->name = $validatedData['recipe_name'];
        $recipe->description = $validatedData['recipe_description'];
        $recipe->image = 'https://placehold.co/600x400'; // static value
        $recipe->cooking_time = $validatedData['recipe_cooking_time'];
        $recipe->serves = $validatedData['recipe_serves'];
        $recipe->user_id = $userId;

        $recipe->save();

        $ingredientNames = $validatedData['ingredient_name'];
        $ingredientQuantity = $validatedData['ingredient_quantity'];
        $ingredientUnit = $validatedData['ingredient_unit'];
        $ingredientAllergen = $validatedData['ingredient_allergen'];

        foreach ($ingredientNames as $index => $ingredientName) {

            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientName,
                'food_group' => 'food_group', // static value
                'allergen' => $ingredientAllergen[$index]]);

            $recipe->ingredients()->attach($ingredient, [
                'quantity' => $ingredientQuantity[$index],
                'unit' => $ingredientUnit[$index]
            ]);
        }

        $cookingInstructions = $validatedData['cooking_instruction'];

        foreach ($cookingInstructions as $index => $instruction) {
            $recipe->cookingInstructions()->create([
                'step' => $index + 1,
                'instruction' => $instruction
            ]);
        }

        return redirect('/recipes');
    }
}
