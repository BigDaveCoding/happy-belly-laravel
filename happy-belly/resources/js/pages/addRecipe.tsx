import NavBar from "@/components/navbar";
import {useEffect, useState} from "react";
import GetCsrfToken from "@/functions/get-csrf-token";
import {useIngredientFormData} from "@/hooks/use-ingredient-form-data";
import {useRecipeData} from "@/hooks/use-recipe-data";
import {useAddFormErrors} from "@/hooks/use-add-form-errors";
import ErrorMessage from "@/components/error-message";

export default function AddRecipe() {

    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    const {recipeData, inputRecipeData} = useRecipeData();

    const {ingredientData, addIngredient, removeIngredient, updateIngredientData} = useIngredientFormData();

    const {formErrors, errors, formErrorsExist} = useAddFormErrors({recipeData, ingredientData})

    useEffect(() => {
        async function assignToken() {
            setCsrfToken(await GetCsrfToken())
        }
        assignToken()
    },[])

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
                {formErrors && recipeData.recipe_name.length < 4 && <ErrorMessage errorMessage={errors.recipe_name} extraCss={"col-span-2"} />}

                <label htmlFor="recipe_description">Description :</label>
                <textarea
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    name="recipe_description"
                    placeholder="How would you describe your recipe?"
                ></textarea>
                {formErrors && (recipeData.recipe_description.length < 10 || recipeData.recipe_description.length > 5000) && (
                    <ErrorMessage errorMessage={errors.recipe_description} extraCss={"col-span-2"} />
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
                    <ErrorMessage errorMessage={errors.recipe_cooking_time} extraCss={"col-span-2"} />
                )}

                <label htmlFor="recipe_serves">Serves :</label>
                <input
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="number"
                    name="recipe_serves"
                    placeholder="4"
                />
                {formErrors && (isNaN(parseInt(recipeData.recipe_serves)) || parseInt(recipeData.recipe_serves) <= 0) && (
                    <ErrorMessage errorMessage={errors.recipe_serves} extraCss={"col-span-2"} />
                )}

                <hr className="col-span-2 border-black my-2" />

                <h2 className="col-span-2">Ingredients</h2>

                {ingredientData.map((ingredient, index: number) => {
                    return (
                        <>
                            <div className="col-span-2" key={index + 1}>
                                <div className="grid grid-cols-2 gap-2 rounded border-1 border-black/50 p-2">
                                    <input
                                        className="col-span-2 rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                        type="text"
                                        name="ingredient_name[]"
                                        placeholder="ingredient"
                                        onChange={(e) => {updateIngredientData(e, index)}}
                                    />
                                    {formErrors &&
                                        ingredient.ingredient_name.length <= 0 &&
                                        <ErrorMessage errorMessage={errors.ingredient_name} extraCss={"col-span-2"} />
                                    }
                                    <input
                                        className="rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                        type="number"
                                        name="ingredient_quantity[]"
                                        placeholder="quantity"
                                        onChange={(e) => {updateIngredientData(e, index)}}
                                    />
                                    <input
                                        className="rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                        type="text"
                                        name="ingredient_unit[]"
                                        placeholder="unit"
                                        onChange={(e) => {updateIngredientData(e, index)}}
                                    />
                                    {formErrors &&
                                        (ingredient.ingredient_quantity.length === 0 || isNaN(parseInt(ingredient.ingredient_quantity)) || parseInt(ingredient.ingredient_quantity) <= 0) &&
                                        <ErrorMessage errorMessage={errors.ingredient_quantity} extraCss={"col-span-2"} />
                                    }
                                    <label htmlFor="ingredient_allergen[]">
                                        Allergen :
                                    </label>
                                    <select
                                        className="border-1 rounded"
                                        name="ingredient_allergen[]"
                                        onChange={(e) => {updateIngredientData(e, index)}}
                                    >
                                        <option value="0" defaultChecked>No</option>
                                        <option value="1">Yes</option>
                                    </select>
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
