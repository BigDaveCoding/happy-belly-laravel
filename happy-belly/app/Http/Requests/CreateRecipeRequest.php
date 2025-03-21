<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
//    public function authorize(): bool
//    {
//        return false;
//    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'recipe_name' => 'required|string|max:255|min:4',
            'recipe_description' => 'required|string|min:10',
            'recipe_cooking_time' => 'required|string|numeric|min:1',
            'recipe_serves' => 'required|integer|numeric|min:1',
            'ingredient_name' => 'required|array',
            'ingredient_name.*' => 'required|string|min:1',
            'ingredient_quantity' => 'required|array',
            'ingredient_quantity.*' => 'required|integer|min:1',
            'ingredient_unit' => 'required|array',
            'ingredient_unit.*' => 'nullable|string',
            'ingredient_allergen' => 'required|array',
            'ingredient_allergen.*' => 'required|boolean',
            'cooking_instruction' => 'required|array',
            'cooking_instruction.*' => 'required|string'
        ];
    }
}
