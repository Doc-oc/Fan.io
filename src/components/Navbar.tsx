"use client";
import React from 'react'
import Link from 'next/link';
import {signOut, useSession} from "next-auth/react";
const Navbar = () => {
  const {data: session }: any = useSession();
  return (
    <div>
      <ul className="font-mono text-lg flex justify-between m-10 item-center">
          <div>
              <Link href="/home"><li>Fan.io</li></Link>
          </div>
          <div className="flex gap-10">
            
            {!session ? (
              <>
              <Link href="/home"><li>Home</li></Link>
              <Link href="/about"><li>About</li></Link>
              <Link href="/login"><li>Login</li></Link>

              </>
            ): (
              <>
              <Link href="/feed"><li>Feed</li></Link>
              <Link href="/feed"><li>Team</li></Link>
              <Link href="/feed"><li>Profile</li></Link>
              <li>
                <button onClick={() => signOut()} className="text-white p-2 px-5 -mt-1 bg-green-500 rounded-lg">Log Out</button>
              </li>
              </>
            )}
          </div>
      </ul>
    </div>
  )
}

export default Navbar
