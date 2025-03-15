<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    /** @use HasFactory<\Database\Factories\IngredientFactory> */
    use HasFactory;

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'ingredient_recipe', 'recipe_id', 'ingredient_id')->withPivot('quantity', 'unit');
    }
}
