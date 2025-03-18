import {FormEvent, useState} from "react";
import {RecipeFormData} from "@/types";

export function useAddFormErrors({recipeData}:{recipeData: RecipeFormData}) {

    const [formErrors, setFormErrors] = useState<boolean>(false);

    const errors = {
        'recipe_name' : 'Recipe Name must be longer than 4 characters',
        'recipe_description' : 'Must be between 10 and 5000 characters',
        'recipe_image' : '',
        'recipe_cooking_time' : 'Must be a number & above 0',
        'recipe_serves' : 'must be a number & above 0'
    }

    function formErrorsExist(e: FormEvent) {
        if (recipeData.recipe_name.length < 4 ||
            (recipeData.recipe_description.length < 10 || recipeData.recipe_description.length > 500) ||
            (isNaN(parseInt(recipeData.recipe_cooking_time)) || parseInt(recipeData.recipe_cooking_time) <= 0) ||
            (isNaN(parseInt(recipeData.recipe_serves)) || parseInt(recipeData.recipe_serves) <= 0)){
            e.preventDefault()
            setFormErrors(true)
        }
    }

    return {formErrors, errors, formErrorsExist}
}
