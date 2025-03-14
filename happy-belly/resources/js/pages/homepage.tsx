import Logo from "@/components/logo";
import NavBar from "@/components/navbar";
import LogInHomepageButton from "@/components/log-in-homepage-button";
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import IntroHomepage from "@/components/intro-homepage";
export default function homepage() {
    const { auth } = usePage<SharedData>().props

    return (
        <>
            <div className="bg-bg-color min-h-dvh">
                <NavBar />
                <Logo />
                <IntroHomepage />
                {!auth.user && <LogInHomepageButton />}
            </div>
        </>
    )
}
