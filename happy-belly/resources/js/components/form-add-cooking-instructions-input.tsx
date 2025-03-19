import ErrorMessage from "@/components/error-message";
import {CookingInstructionFormData} from "@/types";
import {FormEvent} from "react";

export default function FormAddCookingInstructionsInput({cookingInstructions, formErrors, errors, updateCookingInstruction} :
{cookingInstructions : CookingInstructionFormData[], formErrors : boolean, errors : Record<string, string>, updateCookingInstruction : (e: FormEvent, index : number) => void}) {
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
                                onChange={(e) => updateCookingInstruction(e, index)}
                            >
                                </textarea>
                        </div>
                        {formErrors &&
                            instruction.cooking_instruction.length <= 0 &&
                            <ErrorMessage errorMessage={errors.cooking_instruction} extraCss={"col-span-2"} />
                        }
                    </>
                )
            })}
        </>
    )
}
