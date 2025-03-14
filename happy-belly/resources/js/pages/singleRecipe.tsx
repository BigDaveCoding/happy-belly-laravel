interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    cooking_time: string;
}

export default function SingleRecipe({ recipe }: { recipe: Recipe }) {
    return (
        <>
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name} className="w-full max-w-md rounded-lg shadow-md" />
            <p className="text-lg mt-2">{recipe.description}</p>
            <p className="text-sm italic">Cooking Time: {recipe.cooking_time} minutes</p>
        </>
    );
}
