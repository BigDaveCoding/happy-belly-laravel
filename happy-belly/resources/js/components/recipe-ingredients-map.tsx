import {Ingredient} from "@/types";

export default function RecipeIngredientsMap({ingredients}:{ingredients: Ingredient[]}) {
    // console.log(ingredients)
    return (
        <>
            <ul className="list-disc px-6">
                {ingredients.map((ingredient, index) => {
                    return (
                        <li key={index} className="capitalize">
                            {ingredient.name} - {ingredient.pivot.quantity} {ingredient.pivot.unit}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
