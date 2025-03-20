import {
    CookingInstructionFormData,
    cookingInstructions,
    Ingredient,
    SingleRecipeIngredientsInstructions
} from "@/types";
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

export default function EditRecipe({userId, recipe, csrf_token}: {userId: number|null, recipe: SingleRecipeIngredientsInstructions, csrf_token : string }) {
    console.log(recipe)


    const {recipeData, inputRecipeData} = useRecipeData();

    const {ingredientData, addIngredient, removeIngredient, updateIngredientData, initIngredientData} = useIngredientFormData();

    const {cookingInstructions, addCookingInstruction, removeCookingInstruction, updateCookingInstruction, initCookingInstructionData} = useCookingInstructionFormData()

    const {formErrors, errors, formErrorsExist} = useAddFormErrors({recipeData, ingredientData, cookingInstructions})

    useEffect(() => {
        updateRecipeDataFields()
        updateIngredientDataFields()
        updateCookingInstructionFields()
    },[])

    function updateRecipeDataFields() {
        recipeData.recipe_name = recipe.name
        recipeData.recipe_description = recipe.description
        recipeData.recipe_cooking_time = recipe.cooking_time ?? null
        recipeData.recipe_serves = recipe.serves ?? 0
        recipeData.recipe_image = recipe.image
    }

    function updateIngredientDataFields() {
        const ingredients : Ingredient[] = recipe.ingredients
        initIngredientData(ingredients)
    }

    function updateCookingInstructionFields() {
        const cookingInstructions : cookingInstructions[] = recipe.cooking_instructions
        initCookingInstructionData(cookingInstructions)
    }

    console.log(ingredientData, recipeData, cookingInstructions)

    return (
        <>
            <NavBar userId={userId} />
            <h1>Edit Recipe</h1>
            <form
                className="mx-4 grid grid-cols-[1fr_2fr] items-center gap-2"
                // method="post"
                // action="/recipe/add"
                onSubmit={(e) => formErrorsExist(e)}
            >
                {csrf_token && <input type="hidden" name="_token" value={csrf_token} />}

                <label htmlFor="recipe_name">Recipe Name :</label>
                <input
                    className="rounded border-1 border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                    type="text"
                    name="recipe_name"
                    placeholder="Enchiladas"
                    value={recipeData.recipe_name}
                    onChange={(e) => inputRecipeData(e)}

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
                    value={recipeData.recipe_description}
                    onChange={(e) => inputRecipeData(e)}
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
                    value={recipeData.recipe_cooking_time}
                    onChange={(e) => inputRecipeData(e)}
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
                    value={recipeData.recipe_serves}
                    onChange={(e) => inputRecipeData(e)}
                />
                {formErrors &&
                    (isNaN(recipeData.recipe_serves) || recipeData.recipe_serves <= 0) &&
                    <ErrorMessage errorMessage={errors.recipe_serves} extraCss={"col-span-2"} />
                }

                <hr className="col-span-2 border-black my-2" />

                <h2 className="col-span-2">Ingredients</h2>

                <FormAddRecipeIngredientInput
                    ingredientData={ingredientData}
                    formErrors={formErrors}
                    errors={errors}
                    updateIngredientData={updateIngredientData}
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                />

                <FormPlusMinusButton addRemoveFunction={addIngredient} plusOrMinus={true} />


                <h2 className="col-span-2">Cooking Instructions</h2>

                <FormAddCookingInstructionsInput
                    cookingInstructions={cookingInstructions}
                    formErrors={formErrors} errors={errors}
                    updateCookingInstruction={updateCookingInstruction}
                    removeCookingInstruction={removeCookingInstruction}
                    addCookingInstruction={addCookingInstruction}
                />

                {cookingInstructions.length === 0 && <FormPlusMinusButton addRemoveFunction={() => addCookingInstruction(0)} plusOrMinus={true} />}

                <input
                    className="bg-primary-color col-span-2 w-8/12 justify-self-center rounded border-1 p-2 inset-shadow-sm inset-shadow-black/30"
                    type="submit"
                    value="Add recipe"
                />
            </form>
        </>
    )
}
