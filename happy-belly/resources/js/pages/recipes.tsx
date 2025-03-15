import RecipeDataMap from "@/components/recipe-data-map";
import NavBar from "@/components/navbar";
import RecipesPageTitle from "@/components/recipes-page-title";
import { Recipe } from "@/types"
import RecipesIntroText from "@/components/recipes-intro-text";
import RecipesOurRecipes from "@/components/recipes-our-recipes";

export default function Recipes({userId, adminRecipes, userRecipes}:{userId: number|null, adminRecipes: Recipe[], userRecipes: Recipe[]}) {

    console.log("admin recipes", adminRecipes)
    console.log("user recipes",userRecipes)

    return (
        <>
            <div className="font-main-fredoka bg-bg-color min-h-dvh">
                <NavBar userId={userId}/>
                <RecipesPageTitle />
                <RecipesIntroText />
                <RecipesOurRecipes adminRecipes={adminRecipes} />

                <h3 className="text-2xl font-main-noto underline underline-offset-4 p-2 mx-2">User Recipes</h3>
                <div className="bg-primary-color/30 mx-2 h-[550px] overflow-scroll rounded-2xl border-1 bg-[url(/images/geometric-bg-one-1000x1000.png)] bg-cover">
                    {userRecipes && <RecipeDataMap recipeData={userRecipes} />}
                </div>
            </div>
        </>
    );
}
