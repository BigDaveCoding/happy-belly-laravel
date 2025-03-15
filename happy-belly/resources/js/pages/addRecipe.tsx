import NavBar from "@/components/navbar";

export default function addRecipe() {
    return (
        <>
            <NavBar userId={1} />
            <h1>Add Recipe</h1>
            <form className="grid grid-cols-[1fr_2fr] gap-2 items-center mx-4" method="post" action="/recipe/add">
                <label htmlFor="recipe_name">Recipe Name :</label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_name" placeholder="Enchiladas" />

                <label htmlFor="recipe_description">Description :</label>
                <textarea className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" name="recipe_description" placeholder="How would you describe your recipe?" ></textarea>

                <label htmlFor="recipe_image">Image URL :</label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_image" placeholder="www.image.com" />

                <label htmlFor="recipe_cooking_time">Cooking Time :<br/><i>(Minutes)</i></label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_cooking_time" placeholder="30" />

                <label htmlFor="recipe_serves">Serves :</label>
                <input className="border-1 border-black inset-shadow-sm inset-shadow-slate-300 p-2 rounded" type="text" name="recipe_serves" placeholder="4" />



            </form>
        </>
    )
}
