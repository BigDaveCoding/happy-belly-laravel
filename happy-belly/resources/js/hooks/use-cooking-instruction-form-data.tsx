import {FormEvent, useState} from "react";
import {CookingInstructionFormData} from "@/types";

export function useCookingInstructionFormData() {
    const [cookingInstructions, setCookingInstructions] = useState<CookingInstructionFormData[]>([
        {"cooking_instruction" : ""}
    ])

    function addCookingInstruction() {
        setCookingInstructions([
            ...cookingInstructions,
            {"cooking_instruction" : ""}
        ])
    }

    function removeCookingInstruction() {
        const $newData = [...cookingInstructions]
        setCookingInstructions($newData.slice(0,-1))
    }

    function updateCookingInstruction(e: FormEvent, index:number){
        const {name, value} = e.target as HTMLInputElement
        setCookingInstructions((prevData) => {
            const newData = [...prevData]
            newData[index] = {...newData[index], [name.slice(0, -2)] : value}
            return newData
        })
    }

    return {cookingInstructions, addCookingInstruction, removeCookingInstruction, updateCookingInstruction}
}
