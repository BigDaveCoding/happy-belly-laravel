
export default function FormPlusMinusButton({addRemoveFunction, plusOrMinus}:{addRemoveFunction :() => void, plusOrMinus : boolean}) {
    return (
        <>
            <button
                className=""
                type="button"
                onClick={addRemoveFunction}
            >
                {plusOrMinus ? (
                    <i className="fa-solid fa-plus"></i>
                ) : (
                    <i className="fa-solid fa-minus"></i>
                )}
            </button>
        </>
    )
}
