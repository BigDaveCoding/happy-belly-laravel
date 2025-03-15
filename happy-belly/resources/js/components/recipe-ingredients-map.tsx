import {Ingredient} from "@/types";

export default function RecipeIngredientsMap({ingredients}:{ingredients: Ingredient[]}) {
    console.log(ingredients)
    return (
        <>
            <ul className="list-disc px-6">
                {ingredients.map((ingredient) => {
                    return (
                        <li key={ingredient.id} className="capitalize">
                            {ingredient.name} - {ingredient.pivot.quantity} {ingredient.pivot.unit}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
