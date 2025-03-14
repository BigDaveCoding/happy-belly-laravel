import RecipeDataMap from "@/components/recipe-data-map";
import NavBar from "@/components/navbar";
import RecipesPageTitle from "@/components/recipes-page-title";

interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    cooking_time: string;
}

export default function Recipes({recipes}:{recipes: Recipe[]}) {

    return (
        <>
            <div className="font-main-fredoka bg-bg-color min-h-dvh">
                <NavBar />
                <RecipesPageTitle />

                <div className="flex flex-col gap-4 px-2 pb-4 text-center">
                    <h2 className="text-3xl">Welcome to our Recipes page!</h2>
                    <p className="text-center text-2xl">
                        Explore our recommended recipes, and feel free to create and add your own delicious creations to your profile!
                    </p>
                </div>

                <h3 className="text-2xl font-main-noto underline underline-offset-4 p-1 mx-2">Our Recipes</h3>
                <p className="italic font-main-fredoka mx-2">(Click title to see more)</p>
                <div className="bg-primary-color/30 mx-2 h-[550px] overflow-scroll rounded-2xl border-1 bg-[url(/images/geometric-bg-one-1000x1000.png)] bg-cover">
                    {recipes && <RecipeDataMap recipeData={recipes} />}
                </div>
            </div>
        </>
    );
}
