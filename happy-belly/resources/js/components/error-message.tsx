
export default function ErrorMessage({errorMessage, extraCss} : {errorMessage : string, extraCss : string}){
    return <p className={`text-red-500 text-md font-main-fredoka ${extraCss}`}>{errorMessage}</p>
}
