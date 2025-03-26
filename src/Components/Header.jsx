import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {Navigate} from "react-router-dom";

const Header = () => {
    return (
        <nav className="bg-gray-800 p-4 flex">
            <div className="text-white text-3xl font-bold container flex justify-start items-center">
                <h1>Deepfake Detective 🔎</h1>
            </div>
            <div className="container mx-auto flex justify-end items-center">
                <SignedOut>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:scale-105 hover:cursor-pointer hover:bg-blue-600">
                        <SignInButton/>
                    </button>
                </SignedOut>
                <SignedIn>
                    <Navigate to="/home" replace />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Header;
