import {Ingredient, IngredientFormData, Recipe} from "@/types";
import {FormEvent, useState} from "react";

export function useIngredientFormData() {
    const [ingredientData, setIngredientData] = useState<IngredientFormData[]>([
        {ingredient_name: '', ingredient_quantity: 0, ingredient_unit: '', ingredient_allergen : false}
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
            {ingredient_name: '', ingredient_quantity: 0, ingredient_unit: '', ingredient_allergen : false}
        ])
    }

    function removeIngredient(index : number): void {
        setIngredientData(prevIngredients =>
            prevIngredients.filter((_, i) => i !== index)
        );
    }

    function initIngredientData(ingredients : Ingredient[]): void {
        const input : IngredientFormData[] =
            ingredients.map((ingredient) : IngredientFormData => {
                return {
                    ingredient_name: ingredient.name,
                    ingredient_quantity: ingredient.pivot.quantity,
                    ingredient_unit: ingredient.pivot.unit,
                    ingredient_allergen : ingredient.allergen}
            })
        console.log("input var", input)
        setIngredientData(input)
    }



    return {ingredientData, addIngredient, removeIngredient, updateIngredientData, initIngredientData}
}
