import NavBar from "@/components/navbar";
import {FormEvent, useEffect, useState} from "react";

interface RecipeFormData {
    recipe_name: string;
    recipe_description: string;
    recipe_image: string;
    recipe_cooking_time: string;
    recipe_serves: string;
}

export default function addRecipe() {

    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState<boolean>(false);

    const [recipeData, setRecipeData] = useState<RecipeFormData>({
        'recipe_name' : '',
        'recipe_description' : '',
        'recipe_image' : '',
        'recipe_cooking_time' : '',
        'recipe_serves' : '0'
    })

    const [ingredientData, setIngredientData] = useState([
        {ingredient_name: '', ingredient_quantity: '', ingredient_unit: ''}
    ])

    const inputIngredientData = (index: number, e: FormEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        const updatedIngredients = [...ingredientData];
        updatedIngredients[index][name] = value;
        setIngredientData(updatedIngredients);
    };

    const addIngredient = () => {
        setIngredientData([
            ...ingredientData,
            {ingredient_name: '', ingredient_quantity: '', ingredient_unit: ''}
        ])
    }

    const removeIngredient = () => {
        const removedIngredientArray = ingredientData.slice(0, -1)
        setIngredientData(removedIngredientArray)
    }

    const [errors, setRecipeErrors] = useState<RecipeFormData>({
        'recipe_name' : 'Recipe Name must be longer than 4 characters',
        'recipe_description' : 'Must be between 50 and 5000 characters',
        'recipe_image' : '',
        'recipe_cooking_time' : 'Must be a number & above 0',
        'recipe_serves' : 'must be a number & above 0'
    })

    async function getToken() {
        const res = await fetch('/get-csrf-token');
        const data = await res.json();
        // console.log("Received token:", data.csrf_token);
        setCsrfToken(data.csrf_token);
        return data.csrf_token;
    }

    function inputRecipeData(e: FormEvent): void {
        const { name, value } = e.target as HTMLInputElement;
        if(name == 'recipe_image') {
            setRecipeData(prevState => ({
                ...prevState,
                [name]: 'https://placehold.co/600x400',
            }));
            return
        }
        setRecipeData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function formErrorsExist(e: FormEvent) {
        if (recipeData.recipe_name.length < 4 ||
            (recipeData.recipe_description.length < 50 || recipeData.recipe_description.length > 500) ||
            (isNaN(parseInt(recipeData.recipe_cooking_time)) || parseInt(recipeData.recipe_cooking_time) <= 0) ||
            (isNaN(parseInt(recipeData.recipe_serves)) || parseInt(recipeData.recipe_serves) <= 0)){
            e.preventDefault()
            setFormErrors(true)
        }
    }

    useEffect(() => {
        getToken()
        // console.log("form updating, getting token", csrfToken)
    }, [formErrorsExist])

    // console.log(recipeData)
    console.log("ingredient data:", ingredientData)

    return (
        <>
            <NavBar userId={1} />
            <h1>Add Recipe</h1>
            <form
                className="mx-4 grid grid-cols-[1fr_2fr] items-center gap-2"
                method="post"
                action="/recipe/add"
                onChange={(e) => inputRecipeData(e)}
                onSubmit={(e) => formErrorsExist(e)}
            >
                {csrfToken && <input type="hidden" name="_token" value={csrfToken} />}
                <label htmlFor="recipe_name">Recipe Name :</label>
                <input
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="text"
                    name="recipe_name"
                    placeholder="Enchiladas"
                />
                {formErrors && recipeData.recipe_name.length < 4 && <p className="text-md col-span-2 text-red-500">{errors.recipe_name}</p>}

                <label htmlFor="recipe_description">Description :</label>
                <textarea
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    name="recipe_description"
                    placeholder="How would you describe your recipe?"
                ></textarea>
                {formErrors && (recipeData.recipe_description.length < 50 || recipeData.recipe_description.length > 5000) && (
                    <p className="text-md col-span-2 text-red-500">{errors.recipe_description}</p>
                )}

                <label className={`col-span-2`} htmlFor="recipe_image">
                    Image:
                </label>
                <input
                    className="col-span-2 rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="file"
                    name="recipe_image"
                />
                {recipeData.recipe_image.length > 0 && <img className="col-span-2" src={recipeData.recipe_image} alt="" />}

                <label htmlFor="recipe_cooking_time">
                    Cooking Time :<br />
                    <i>(Minutes)</i>
                </label>
                <input
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="text"
                    name="recipe_cooking_time"
                    placeholder="30"
                />
                {formErrors && (isNaN(parseInt(recipeData.recipe_cooking_time)) || parseInt(recipeData.recipe_cooking_time) <= 0) && (
                    <p className="text-md col-span-2 text-red-500">{errors.recipe_cooking_time}</p>
                )}

                <label htmlFor="recipe_serves">Serves :</label>
                <input
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="number"
                    name="recipe_serves"
                    placeholder="4"
                />
                {formErrors && (isNaN(parseInt(recipeData.recipe_serves)) || parseInt(recipeData.recipe_serves) <= 0) && (
                    <p className="text-md col-span-2 text-red-500">{errors.recipe_serves}</p>
                )}

                <hr className="col-span-2 border-black my-2" />

                <h2 className="col-span-2">Ingredients</h2>

                {ingredientData.map((ingredient, index: number) => {
                    console.log(index);
                    console.log(ingredient);
                    return (
                        <>
                            <div className="col-span-2" key={index + 1}>
                                <div className="grid grid-cols-2 gap-2 rounded border-1 border-black/50 p-2">
                                    <input
                                        className="col-span-2 rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                        type="text"
                                        name="ingredient_name"
                                        value={ingredient.ingredient_name}
                                        placeholder="ingredient"
                                        onChange={(e) => inputIngredientData(index, e)}
                                    />
                                    <input
                                        className="rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                        type="number"
                                        name="ingredient_quantity"
                                        value={ingredient.ingredient_quantity}
                                        placeholder="quantity"
                                        onChange={(e) => inputIngredientData(index, e)}
                                    />
                                    <input
                                        className="rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                        type="text"
                                        name="ingredient_unit"
                                        value={ingredient.ingredient_unit}
                                        placeholder="unit"
                                        onChange={(e) => inputIngredientData(index, e)}
                                    />
                                </div>
                            </div>
                        </>
                    );
                })}

                {/*add ingredient button*/}
                <button className="" type="button" onClick={() => addIngredient()}>
                    <i className="fa-solid fa-plus"></i>
                </button>

                {/*remove ingredient button*/}
                { ingredientData.length > 1 &&
                    <button className="" type="button" onClick={() => removeIngredient()}>
                        <i className="fa-solid fa-minus"></i>
                    </button>
                }

                <input
                    className="bg-primary-color col-span-2 w-8/12 justify-self-center rounded border-1 p-2 inset-shadow-sm inset-shadow-black/30"
                    type="submit"
                    value="Add recipe"
                />
            </form>
        </>
    );
}
