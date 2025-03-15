import Logo from "@/components/logo";
import NavBar from "@/components/navbar";
import LogInHomepageButton from "@/components/log-in-homepage-button";
import IntroHomepage from "@/components/intro-homepage";
import FeaturesHomepage from "@/components/features-homepage";
export default function homepage({userId}:{userId: number|null}) {
    console.log(userId)

    return (
        <>
            <div className="bg-bg-color min-h-dvh">
                <NavBar userId={userId} />
                <Logo />
                <IntroHomepage />
                {/*{!auth.user && <LogInHomepageButton />}*/}
                <FeaturesHomepage />
            </div>
        </>
    )
}
