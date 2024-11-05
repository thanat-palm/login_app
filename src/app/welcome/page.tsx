"use client"

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

function WelcomePage() {

  const {data:session} = useSession();
  console.log(session);
  if(!session) redirect("/");

  return (
    <div className='container h-[100vh] mx-auto flex justify-center items-center'>
        <div className="">
            <h1 className='text-3xl font-semibold'>Welcome back {session?.user?.email}</h1>
            <p>{session?.user?.email}</p>
            <button onClick={() => signOut()} className='bg-red-500 rounded-md px-3 py-1 text-white mt-2 hover:opacity-80'>logout</button>
        </div>
    </div>
  )
}

export default WelcomePage
