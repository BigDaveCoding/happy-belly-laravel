import { useEffect, useState } from "react";
import RecipeDataMap from "@/components/recipe-data-map";

interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    cooking_time: string;
}

export default function Recipes() {
    const [recipeData, setRecipeData] = useState<Recipe[] | null>(null);
    const [loadingRecipeData, setLoadingRecipeData] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoadingRecipeData(true); // ✅ Start loading
        try {
            const res = await fetch("http://localhost:8000/recipeData");
            const data: Recipe[] = await res.json();
            console.log(data);
            setRecipeData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingRecipeData(false);
        }
    }

    return (
        <>
            <h1>Recipes Page</h1>

            {loadingRecipeData && <p>Loading Recipes...</p>}

            {recipeData && <RecipeDataMap recipeData={recipeData} />}
        </>
    );
}
