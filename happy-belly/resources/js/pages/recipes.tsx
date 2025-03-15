import RecipeDataMap from "@/components/recipe-data-map";
import NavBar from "@/components/navbar";
import RecipesPageTitle from "@/components/recipes-page-title";
import { Recipe } from "@/types"
import RecipesIntroText from "@/components/recipes-intro-text";
import RecipesOurRecipes from "@/components/recipes-our-recipes";
import RecipesUserRecipes from "@/components/recipes-user-recipes";

export default function Recipes({userId, adminRecipes, userRecipes}:{userId: number|null, adminRecipes: Recipe[], userRecipes: Recipe[]}) {

    // console.log("admin recipes", adminRecipes)
    // console.log("user recipes",userRecipes)

    return (
        <>
            <div className="font-main-fredoka bg-bg-color min-h-dvh">
                <NavBar userId={userId}/>
                <RecipesPageTitle />
                <RecipesIntroText />
                <RecipesOurRecipes adminRecipes={adminRecipes} />
                <RecipesUserRecipes userRecipes={userRecipes} />
            </div>
        </>
    );
}
