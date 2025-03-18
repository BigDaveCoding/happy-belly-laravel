import {IngredientFormData} from "@/types";
import {useState} from "react";

export function useIngredientFormData() {
    const [ingredientData, setIngredientData] = useState<IngredientFormData[]>([
        {ingredient_name: '', ingredient_quantity: '', ingredient_unit: ''}
    ])

    function addIngredient(): void {
        setIngredientData([
            ...ingredientData,
            {ingredient_name: '', ingredient_quantity: '', ingredient_unit: ''}
        ])
    }

    function removeIngredient(): void {
        const removedIngredientArray = ingredientData.slice(0, -1)
        setIngredientData(removedIngredientArray)
    }

    return {ingredientData, addIngredient, removeIngredient}
}
