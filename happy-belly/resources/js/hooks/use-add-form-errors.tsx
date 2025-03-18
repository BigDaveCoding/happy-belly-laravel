import {FormEvent, useState} from "react";
import {IngredientFormData, RecipeFormData} from "@/types";

export function useAddFormErrors({recipeData, ingredientData}:{recipeData: RecipeFormData, ingredientData:IngredientFormData[]}) {

    const [formErrors, setFormErrors] = useState<boolean>(false);

    const errors = {
        'recipe_name' : 'Recipe Name must be longer than 4 characters',
        'recipe_description' : 'Must be between 10 and 5000 characters',
        'recipe_image' : '',
        'recipe_cooking_time' : 'Must be a number & above 0',
        'recipe_serves' : 'Must be a number & above 0',
        'ingredient_name' : 'Must have an ingredient',
        'ingredient_quantity' : 'Must be a number & above 0'
    }

    function formErrorsExist(e: FormEvent) {
        formRecipeErrorsExist(e)
        formIngredientErrorsExist(e)
    }

    function formRecipeErrorsExist(e: FormEvent) {
        if (recipeData.recipe_name.length < 4 ||
            (recipeData.recipe_description.length < 10 || recipeData.recipe_description.length > 500) ||
            (isNaN(parseInt(recipeData.recipe_cooking_time)) || parseInt(recipeData.recipe_cooking_time) <= 0) ||
            (isNaN(parseInt(recipeData.recipe_serves)) || parseInt(recipeData.recipe_serves) <= 0)
        ){
            e.preventDefault()
            setFormErrors(true)
        }
    }

    function formIngredientErrorsExist(e: FormEvent) {
        ingredientData.forEach(ingredient => {
            if(ingredient.ingredient_name.length === 0 ||
                (ingredient.ingredient_quantity.length === 0 || isNaN(parseInt(ingredient.ingredient_quantity)) || parseInt(ingredient.ingredient_quantity) <= 0)
            ){
                e.preventDefault()
                setFormErrors(true)
            }
        })
    }

    return {formErrors, errors, formErrorsExist}
}
