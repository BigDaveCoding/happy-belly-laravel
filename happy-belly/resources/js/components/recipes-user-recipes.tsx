import {Recipe} from "@/types";
import RecipeDataMap from "@/components/recipe-data-map";

export default function RecipesUserRecipes({userRecipes}:{userRecipes : Recipe[]}) {
    return (
        <>
            <h3 className="text-2xl underline underline-offset-4 p-2 mx-2">User Recipes</h3>
            <div className="bg-primary-color/30 mx-2 h-[550px] overflow-scroll rounded-2xl border-1 bg-[url(/images/geometric-bg-one-1000x1000.png)] bg-cover">
                {userRecipes && <RecipeDataMap recipeData={userRecipes} />}
            </div>
        </>
    )
}
