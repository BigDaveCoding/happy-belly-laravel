import ErrorMessage from "@/components/error-message";
import {CookingInstructionFormData} from "@/types";
import {FormEvent} from "react";
import FormPlusMinusButton from "@/components/form-plus-minus-button";

export default function FormAddCookingInstructionsInput({cookingInstructions, formErrors, errors, updateCookingInstruction, removeCookingInstruction, addCookingInstruction} : {
        cookingInstructions : CookingInstructionFormData[],
        formErrors : boolean, errors : Record<string, string>,
        updateCookingInstruction : (e: FormEvent, index : number) => void,
        removeCookingInstruction : (index : number) => void,
        addCookingInstruction : (index : number) => void
    }) {

    // console.log(cookingInstructions)
    return (
        <>
            {cookingInstructions.map((instruction, index) => {
                return (
                    <>
                        <div className="col-span-2 flex flex-col gap-2 font-main-fredoka" key={index}>
                            <p>Step {index + 1} .</p>
                            <textarea
                                className="w-full border-1 border-black p-2 rounded"
                                name="cooking_instruction[]"
                                placeholder="What happens now?!"
                                value={instruction.cooking_instruction}
                                onChange={(e) => updateCookingInstruction(e, index)}
                            >
                                </textarea>
                        </div>
                        {formErrors &&
                            instruction.cooking_instruction.length <= 0 &&
                            <ErrorMessage errorMessage={errors.cooking_instruction} extraCss={"col-span-2"} />
                        }

                        <FormPlusMinusButton addRemoveFunction={() => removeCookingInstruction(index)} plusOrMinus={false} />
                        <FormPlusMinusButton addRemoveFunction={() => addCookingInstruction(index)} plusOrMinus={true} />

                    </>
                )
            })}
        </>
    )
}
