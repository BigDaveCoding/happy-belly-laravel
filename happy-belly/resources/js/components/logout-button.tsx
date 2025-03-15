
import React from 'react';
import { useForm } from '@inertiajs/react';

const LogoutButton = () => {
    const { post } = useForm();

    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post('/logout', {
            onSuccess: () => {
                window.location.href = '/'; // Redirect to the login page
            },
            onError: (error) => {
                console.error('Logout failed:', error);
            },
        });
    };

    return (
        <form onSubmit={handleLogout} method="POST" action="/logout">
            <button
                type="submit"
                className="border-b-primary-color border-b-1 px-2 py-2 text-right w-full"
            >
                Log Out <i className="fa-solid fa-sign-out-alt w-10 pl-2 text-center text-xl"></i>
            </button>
        </form>
    );
};

export default LogoutButton;
