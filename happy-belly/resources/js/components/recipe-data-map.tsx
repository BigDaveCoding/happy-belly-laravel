import {Link} from "@inertiajs/react";

interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    cooking_time: string;
}
interface RecipeDataMapProps {
    recipeData: Recipe[];
}
export default function RecipeDataMap({recipeData}:RecipeDataMapProps) {
    return (
        <>
            {recipeData.length > 0 ? (
                <div>
                    {recipeData.map((recipe) => (
                        <div key={recipe.id} className="m-4 p-4 border border-gray-300 rounded-lg shadow-md bg-bg-color">
                            <h2 className="text-2xl capitalize font-bold pb-2">{recipe.name}</h2>
                            <img className="pb-2" src={recipe['image']} alt={recipe['name']} />
                            <p className="italic">Cooking Time: {recipe['cooking_time']} minutes</p>
                            <p className="italic">Serves x</p>
                            <Link href={`/singleRecipe/${recipe.id}`} className="text-blue-500 underline underline-offset-4 block text-right">
                                View Full Recipe
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found.</p>
            )}
        </>
    )
}
