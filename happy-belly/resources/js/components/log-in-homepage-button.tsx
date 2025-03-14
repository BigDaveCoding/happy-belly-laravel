import {Link} from "@inertiajs/react";

export default function LogInHomepageButton() {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-2">
                <Link className="font-main-fredoka border-2 border-black bg-primary-color/30 text-2xl p-2 px-6 rounded-2xl
                shadow-lg shadow-[rgba(0,0,0,0.3)_4px_4px_6px] hover:shadow-xl hover:shadow-[rgba(0,0,0,0.4)_6px_6px_8px]" href={route('login')}>
                    LOGIN / REGISTER
                </Link>
            </div>
        </>
    )
}
