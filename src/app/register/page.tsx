"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation"; 

const Register = () => {

    const [error, setError] = useState("");
    const router = useRouter();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        if(!isValidEmail(email)) {
            setError("Email is Invalid");
            return;
        }

        if(!password || password.length < 8 ) {
            setError("Password is Invalid");

            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify ({
                    email, 
                    password
                })
            })
            if(res.status === 400) {
                setError("Email already registered");
            }
            if(res.status === 200) {
                setError("");
                router.push("/login");
            }
        } catch (e) {
            setError("Error, try again!");
            console.log(e);
        }


    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-slate-100 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-lg text-center font-semibold mb-8">Sign Up for Fan.io!</h2>
                <form className="text-lg" onSubmit={handleSubmit}>
                <input type="text" className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-400 focus:text-black" placeholder="Full Name" required /> 
                    <input type="text" className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-400 focus:text-black" placeholder="Email" required /> 
                    <input type="password" className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-400 focus:text-black" placeholder="Password" required /> 
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">{''}Register</button>
                    <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                </form>
                <p className="text-base text-center py-3">Already have an account? <Link className="text-green-500 hover:underline mt-2" href="/login"> Login</Link></p>
            </div>
        </div>
    )
}

export default Register;
