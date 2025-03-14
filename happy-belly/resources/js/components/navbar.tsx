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
            <div className="flex justify-end p-2">
                <i onClick={() => toggleNavBar()} className="fa-solid fa-bars w-10 cursor-pointer pl-2 text-center text-3xl"></i>
            </div>

            {navBarOpen && (
                <div id="navbar" className="absolute w-full bg-bg-color font-main-fredoka flex flex-col justify-end border-t-1 border-primary-color">
                    <Link className="nav-link border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('home')}>
                        Home <i className="fa-solid fa-house w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="nav-link border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('recipe')}>
                        Recipes <i className="fa-solid fa-utensils w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="nav-link border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('home')}>
                        Shopping List <i className="fa-solid fa-list-check w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    <Link className="nav-link border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('home')}>
                        Food Diary <i className="fa-solid fa-book w-10 pl-2 text-center text-xl"></i>
                    </Link>
                    {auth.user ? (
                        <Link className="nav-link border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('dashboard')}>
                            Account <i className="fa-solid fa-circle-user w-10 pl-2 text-center text-xl"></i>
                        </Link>
                    ) : (
                        <Link className="nav-link border-b-primary-color border-b-1 px-2 py-2 text-right" href={route('login')}>
                            Log In <i className="fa-solid fa-circle-user w-10 pl-2 text-center text-xl"></i>
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}
