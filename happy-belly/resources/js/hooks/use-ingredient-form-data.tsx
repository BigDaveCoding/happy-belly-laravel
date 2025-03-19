import {Ingredient, IngredientFormData, Recipe} from "@/types";
import {FormEvent, useState} from "react";

export function useIngredientFormData() {
    const [ingredientData, setIngredientData] = useState<IngredientFormData[]>([
        {ingredient_name: '', ingredient_quantity: '', ingredient_unit: '', ingredient_allergen : 0}
    ])

    function updateIngredientData(e: FormEvent, index: number) {
        const {name, value} = e.target as HTMLInputElement
        setIngredientData((prevData : IngredientFormData[]) : IngredientFormData[] => {
            const newData : IngredientFormData[] = [...prevData]
            // Because laravel needs [] in name attribute,
            // I'm slicing name to remove '[]'
            // Goes from 'ingredient_name[]' to 'ingredient_name'
            // Matching my ingredientData
            newData[index] = {...newData[index], [name.slice(0, -2)] : value}
            return newData
        })
    }

    function addIngredient(): void {
        setIngredientData([
            ...ingredientData,
            {ingredient_name: '', ingredient_quantity: '', ingredient_unit: '', ingredient_allergen : 0}
        ])
    }

    function removeIngredient(index : number): void {
        setIngredientData(prevIngredients =>
            prevIngredients.filter((_, i) => i !== index)
        );
    }

    function initIngredientData(ingredients : IngredientFormData[]): void {
        const input=
            ingredients.map((ingredient:IngredientFormData) => {
                return {
                    ingredient_name: ingredient.ingredient_name,
                    ingredient_quantity: ingredient.ingredient_quantity,
                    ingredient_unit: ingredient.ingredient_unit ?? null,
                    ingredient_allergen : ingredient.ingredient_allergen}
            })
        setIngredientData(input)
    }



    return {ingredientData, addIngredient, removeIngredient, updateIngredientData, initIngredientData}
}
