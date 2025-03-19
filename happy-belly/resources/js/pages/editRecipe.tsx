import {SingleRecipeIngredientsInstructions} from "@/types";
import NavBar from "@/components/navbar";
import ErrorMessage from "@/components/error-message";
import FormAddRecipeIngredientInput from "@/components/form-add-recipe-ingredient-input";
import FormPlusMinusButton from "@/components/form-plus-minus-button";
import FormAddCookingInstructionsInput from "@/components/form-add-cooking-instructions-input";
import {useEffect, useState} from "react";
import {useRecipeData} from "@/hooks/use-recipe-data";
import {useIngredientFormData} from "@/hooks/use-ingredient-form-data";
import {useCookingInstructionFormData} from "@/hooks/use-cooking-instruction-form-data";
import {useAddFormErrors} from "@/hooks/use-add-form-errors";
import GetCsrfToken from "@/functions/get-csrf-token";

export default function EditRecipe({userId, recipe }: {userId: number|null, recipe: SingleRecipeIngredientsInstructions }) {
    console.log(recipe)

    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    const {recipeData, inputRecipeData} = useRecipeData();

    const {ingredientData, addIngredient, removeIngredient, updateIngredientData, initIngredientData} = useIngredientFormData();

    const {cookingInstructions, addCookingInstruction, removeCookingInstruction, updateCookingInstruction} = useCookingInstructionFormData()

    const {formErrors, errors, formErrorsExist} = useAddFormErrors({recipeData, ingredientData, cookingInstructions})

    useEffect(() => {
        async function assignToken() {
            setCsrfToken(await GetCsrfToken())
        }
        assignToken()
        updateRecipeDataFields()
        updateIngredientDataFields()
    },[])

    function updateRecipeDataFields() {
        recipeData.recipe_name = recipe.name
        recipeData.recipe_description = recipe.description
        recipeData.recipe_cooking_time = recipe.cooking_time ?? null
        recipeData.recipe_serves = recipe.serves ?? 0
        recipeData.recipe_image = recipe.image
    }

    function updateIngredientDataFields() {
        const ingredients = recipe.ingredients
        initIngredientData(ingredients)
    }

    console.log(ingredientData, recipeData, cookingInstructions)

    return (
        <>
            <NavBar userId={userId} />
            <h1>Edit Recipe</h1>
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
                    value={recipeData.recipe_name}
                />
                {formErrors &&
                    recipeData.recipe_name.length < 4 &&
                    <ErrorMessage errorMessage={errors.recipe_name} extraCss={"col-span-2"} />
                }

                <label htmlFor="recipe_description">Description :</label>
                <textarea
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    name="recipe_description"
                    placeholder="How would you describe your recipe?"
                    value={recipe.description}

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
                    value={recipe.cooking_time}

                />
                {formErrors &&
                    (isNaN(parseInt(recipeData.recipe_cooking_time)) || parseInt(recipeData.recipe_cooking_time) <= 0) &&
                    <ErrorMessage errorMessage={errors.recipe_cooking_time} extraCss={"col-span-2"} />
                }

                <label htmlFor="recipe_serves">Serves :</label>
                <input
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="number"
                    name="recipe_serves"
                    placeholder="4"
                    value={recipe.serves}
                />
                {formErrors &&
                    (isNaN(recipeData.recipe_serves) || recipeData.recipe_serves <= 0) &&
                    <ErrorMessage errorMessage={errors.recipe_serves} extraCss={"col-span-2"} />
                }

                <hr className="col-span-2 border-black my-2" />

                <h2 className="col-span-2">Ingredients</h2>

                {/*<FormAddRecipeIngredientInput ingredientData={ingredientData} formErrors={formErrors} errors={errors} updateIngredientData={updateIngredientData} />*/}

                {/*/!*ingredient form buttons*!/*/}
                {/*<FormPlusMinusButton addRemoveFunction={addIngredient} plusOrMinus={true} />*/}
                {/*{ ingredientData.length > 1 ? (*/}
                {/*    <FormPlusMinusButton addRemoveFunction={removeIngredient} plusOrMinus={false} />*/}
                {/*) : (*/}
                {/*    <span></span>*/}
                {/*)*/}
                {/*}*/}

                <h2 className="col-span-2">Cooking Instructions</h2>

                {/*<FormAddCookingInstructionsInput cookingInstructions={cookingInstructions} formErrors={formErrors} errors={errors} updateCookingInstruction={updateCookingInstruction} />*/}

                {/*/!*cooking step buttons*!/*/}
                {/*<FormPlusMinusButton addRemoveFunction={addCookingInstruction} plusOrMinus={true} />*/}
                {/*{ cookingInstructions.length > 1 ? (*/}
                {/*    <FormPlusMinusButton addRemoveFunction={removeCookingInstruction} plusOrMinus={false} />*/}
                {/*) : (*/}
                {/*    <span></span>*/}
                {/*)*/}
                {/*}*/}

                <input
                    className="bg-primary-color col-span-2 w-8/12 justify-self-center rounded border-1 p-2 inset-shadow-sm inset-shadow-black/30"
                    type="submit"
                    value="Add recipe"
                />
            </form>
        </>
    )
}
