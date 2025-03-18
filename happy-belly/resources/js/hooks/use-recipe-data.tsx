import {FormEvent, useState} from "react";
import {RecipeFormData} from "@/types";

export function useRecipeData() {

    const [recipeData, setRecipeData] = useState<RecipeFormData>({
        'recipe_name' : '',
        'recipe_description' : '',
        'recipe_image' : '',
        'recipe_cooking_time' : '',
        'recipe_serves' : '0'
    })

    function inputRecipeData(e: FormEvent): void {
        const { name, value } = e.target as HTMLInputElement;
        if(name == 'recipe_image') {
            setRecipeData(prevState => ({
                ...prevState,
                [name]: 'https://placehold.co/600x400',
            }));
            return
        }
        setRecipeData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    return {recipeData, inputRecipeData}
}
