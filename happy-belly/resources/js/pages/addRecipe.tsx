import NavBar from "@/components/navbar";
import {FormEvent, useEffect, useState} from "react";

export default function addRecipe() {

    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    const [recipeData, setRecipeData] = useState<object>({
        'recipe_name' : '',
        'recipe_description' : '',
        'recipe_image' : '',
        'recipe_cooking_time' : '',
        'recipe_serves' : 0
    })

    async function getToken() {
        const res = await fetch('/get-csrf-token');
        const data = await res.json();
        console.log("Received token:", data.csrf_token);
        setCsrfToken(data.csrf_token);
        return data.csrf_token;
    }

    function inputRecipeData(e: FormEvent): void {
        const { name, value } = e.target as HTMLInputElement;

        setRecipeData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        inputRecipeData(e)
        const token = await getToken()
        setCsrfToken(token)

        console.log("token in handle submit form",token)
        console.log("recipe data:",recipeData)


    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <>
            <NavBar userId={1} />
            <h1>Add Recipe</h1>
            <form
                onChange={(e) => inputRecipeData(e)}
                onSubmit={(e) => handleFormSubmit(e)}
                className="grid grid-cols-[1fr_2fr] gap-2 items-center mx-4"
                method="post"
                action="/recipe/add"
            >
                {csrfToken && <input type="hidden" name="_token" value={csrfToken} />}
                <label htmlFor="recipe_name">Recipe Name :</label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_name" placeholder="Enchiladas" />

                <label htmlFor="recipe_description">Description :</label>
                <textarea className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" name="recipe_description" placeholder="How would you describe your recipe?" ></textarea>

                <label htmlFor="recipe_image">Image URL :</label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_image" placeholder="www.image.com" />

                <label htmlFor="recipe_cooking_time">Cooking Time :<br/><i>(Minutes)</i></label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_cooking_time" placeholder="30" />

                <label htmlFor="recipe_serves">Serves :</label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="number" name="recipe_serves" placeholder="4" />

                <input className="col-span-2 border-1 p-2 w-8/12 bg-primary-color justify-self-center rounded inset-shadow-sm inset-shadow-black/30" type="submit" value="Add recipe" />

            </form>
        </>
    )
}
