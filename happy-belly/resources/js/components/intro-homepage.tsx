
export default function IntroHomepage() {
    return (
        <>
            <div className="flex flex-col pt-2 font-main-fredoka text-center text-xl overflow-hidden">
                <div className="relative flex flex-col overflow-hidden">
                    <p className="text-3xl bg-primary-color/30 py-2 px-4">Eat Better, Feel Better!</p>
                    <img className="absolute opacity-10 w-full" src="/images/geometric-bg-one-1000x1000.png" alt="" />
                </div>
                <p className="py-2 px-4">
                    <strong className="text-primary-color text-2xl">Happy Belly </strong>
                    is tailored for those with Crohn’s or Colitis.<br/> Featuring personalised recipes,
                    a smart shopping list, and a food diary to track what works for you.
                </p>
            </div>
        </>
    )
}
