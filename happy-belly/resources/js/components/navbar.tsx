import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {useState} from "react";

export default function NavBar() {
    const { auth } = usePage<SharedData>().props

    const [navBarOpen, setNavBarOpen] = useState(false)

    function toggleNavBar() {
        setNavBarOpen(!navBarOpen);
    }

    return (
        <>
            {auth.user && (
                <div className="flex justify-between items-center border-b-1 border-b-primary-color p-2">
                    <Link href={route('home')}><p className="font-main-fredoka text-2xl">HB</p></Link>
                    <i onClick={() => toggleNavBar()} className="fa-solid fa-bars w-10 cursor-pointer pl-2 text-center text-3xl"></i>
                </div>
            )}
            {/*nav bar if user is logged in*/}
            {navBarOpen && auth.user && (
                <div className="bg-bg-color font-main-fredoka  absolute flex w-full flex-col justify-end z-40">
                    <Link className=" border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('home')}>
                        Home <i className="fa-solid fa-house w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('recipes')}>
                        Recipes <i className="fa-solid fa-utensils w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('home')}>
                        Shopping List <i className="fa-solid fa-list-check w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('home')}>
                        Food Diary <i className="fa-solid fa-book w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('dashboard')}>
                        Account <i className="fa-solid fa-circle-user w-10 pl-2 text-center text-xl"></i>
                    </Link>
                </div>
            )}

            {/*nav bar if user is not logged in - just an icon that links to the login page*/}
            {!auth.user && (
                <div className="flex justify-between items-center p-2 border-b-1 border-b-primary-color">
                    <Link href={route('home')}><p className="font-main-fredoka text-2xl">HB</p></Link>
                    <Link className="px-2 py-2 text-right" href={route('login')}>
                        <i className="fa-solid fa-arrow-right-to-bracket w-10 pl-2 text-center text-xl"></i>
                    </Link>
                </div>
            )}
        </>
    );
}
