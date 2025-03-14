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
                        <div key={recipe.id} className="m-4 p-4 border border-gray-300 rounded-lg shadow-md">
                            <h2 className="text-2xl capitalize font-bold">{recipe.name}</h2>
                            <p className="text-xl">{recipe.description}</p>
                            <img src={recipe['image']} alt={recipe['name']} />
                            <p className="italic">Cooking Time: {recipe['cooking_time']} minutes</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found.</p>
            )}
        </>
    )
}
