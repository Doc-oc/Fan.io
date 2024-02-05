"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {

  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/feed");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/feed");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }


  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-slate-100 p-8 rounded-lg shadow-md w-96">
          <h1 className="text-lg text-center font-semibold mb-8">Login to Fan.io!</h1>
          <form className="text-lg" onSubmit={handleSubmit}>
            <input type="text" className="text-lg w-full border border-gray-300 text-black rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password" className="text-lg w-full border border-gray-300 text-black rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">{" "}
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>

          <p className="text-base text-center py-3">Need an Account? <Link className="text-green-500 hover:underline mt-2" href="/register">Create One</Link></p>

        </div>
      </div>
    )
  )
}

export default Login
