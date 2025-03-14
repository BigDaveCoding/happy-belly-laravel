import {Link} from "@inertiajs/react";

export default function LogInHomepageButton() {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-2">
                <Link className="font-main-fredoka border-2 border-black text-2xl p-2 px-6 rounded-2xl" href={route('login')}>
                    LOGIN / REGISTER
                </Link>
            </div>
        </>
    )
}
