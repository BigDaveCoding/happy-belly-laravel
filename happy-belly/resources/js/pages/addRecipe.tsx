import NavBar from "@/components/navbar";
import {useEffect, useState} from "react";

export default function addRecipe() {

    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    useEffect(() => {
        // Fetch CSRF token from the backend
        const fetchCsrfToken = async () => {
            const response = await fetch('/get-csrf-token');
            const data = await response.json();
            console.log(data)
            console.log('this is the token: ', data.csrf_token)
            setCsrfToken(data.csrf_token);
        };

        fetchCsrfToken();
    }, []);

    return (
        <>
            <NavBar userId={1} />
            <h1>Add Recipe</h1>
            <form className="grid grid-cols-[1fr_2fr] gap-2 items-center mx-4" method="post" action="/recipe/add">
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
