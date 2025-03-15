import { SingleRecipeIngredientsInstructions } from "@/types";
import NavBar from "@/components/navbar";
import RecipeIngredientsMap from "@/components/recipe-ingredients-map";


export default function SingleRecipe({userId, recipe }: {userId: number|null, recipe: SingleRecipeIngredientsInstructions }) {
    console.log(recipe)
    return (
        <>
            <div className="font-main-fredoka">
                <NavBar userId={userId} />
                <div className="grid grid-cols-1 gap-2 p-2">
                    <h1 className="text-5xl text-center font-medium capitalize">{recipe.name}</h1>
                    <p className="text-lg">{recipe.description}</p>
                    <img src={recipe.image} alt={recipe.name} className="w-full max-w-md rounded-lg shadow-md" />
                </div>

                <h2>Ingredients</h2>
                <RecipeIngredientsMap ingredients={recipe.ingredients} />

            </div>
        </>
    );
}
