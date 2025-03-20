import ErrorMessage from "@/components/error-message";
import {IngredientFormData} from "@/types";
import {FormEvent} from "react";
import FormPlusMinusButton from "@/components/form-plus-minus-button";
import {useIngredientFormData} from "@/hooks/use-ingredient-form-data";

export default function FormAddRecipeIngredientInput({ingredientData, formErrors, errors, updateIngredientData, addIngredient, removeIngredient} :
{ingredientData : IngredientFormData[], formErrors : boolean, errors : Record<string, string>, updateIngredientData: (e: FormEvent, index: number) => void, addIngredient : () => void, removeIngredient : (index : number) => void}) {

    // const {addIngredient, removeIngredient} = useIngredientFormData()

    return (
        <>
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
                                    value={ingredient.ingredient_name}
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
                                    value={ingredient.ingredient_quantity}
                                    onChange={(e) => {updateIngredientData(e, index)}}
                                />
                                <input
                                    className="rounded border border-black p-2 inset-shadow-sm inset-shadow-slate-300"
                                    type="text"
                                    name="ingredient_unit[]"
                                    placeholder="unit"
                                    value={ingredient.ingredient_unit}
                                    onChange={(e) => {updateIngredientData(e, index)}}
                                />
                                {formErrors &&
                                    (isNaN(ingredient.ingredient_quantity) || ingredient.ingredient_quantity <= 0) &&
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
                        {/*ingredient form buttons*/}
                        <FormPlusMinusButton addRemoveFunction={() => removeIngredient(index)} plusOrMinus={false} />
                        {/*{ ingredientData.length > 1 ? (*/}
                        {/*    <FormPlusMinusButton addRemoveFunction={removeIngredient} plusOrMinus={false} />*/}
                        {/*) : (*/}
                        {/*    <span></span>*/}
                        {/*)*/}
                        {/*}*/}
                    </>
                );
            })}
        </>
    )
}
