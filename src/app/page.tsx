"use client"

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("");

  const router = useRouter();

  const {data:session} = useSession();
  if(session) router.replace("/welcome");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {

      const res = await signIn("credentials", {
        email , password , redirect:false
      })

      if(!email || !password) {
        setError("Please fill all inputs!");
        return;
      }

      if (res?.error){
        setError("Invalid credentials");
        return;
      }

      router.replace("welcome");
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main className="bg-gray-300 h-[100vh] w-[100vw] flex items-center">
      <div className="bg-white mx-auto container h-[70vh] flex rounded-lg drop-shadow-md">
        <div className="size-full flex flex-col p-5">
          <div className="font-semibold">
            <li className="deco">Untitled UI</li>  
          </div>
          <form className="flex flex-col w-fit m-auto justify-center gap-5" onSubmit={handleSubmit}>

            {error && (
              <div className="bg-red-500 text-sm py-2 px-3 text-white rounded-md my-2">
                {error}
              </div>
            )}

            <h1 className="text-3xl font-semibold">Welcome back</h1>
            <p className="mr-10 text-gray-500">Welcome back! Please enter your details.</p>
            <div className="">
              <h2>Email</h2>
              <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full h-10 rounded-md border-2 border-gray-300 px-2" placeholder="Enter your email"/>
            </div>
            <div className="">
              <h2>Password</h2>
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full h-10 rounded-md border-2 border-gray-300 px-2" placeholder="Enter your password"/>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <input type="checkbox" className="" name="" id="" />
                <h2 className="ml-1 text-sm">Remember for 30 days</h2>
              </div>
              <Link href="#" className="text-green-500 text-sm hover:underline">Forget password</Link>
            </div>
            <button type="submit" className="bg-green-600 w-full py-2 text-white rounded-md">Sign in</button>
            <p className="text-center text-sm text-gray-500">Don't have an account? <Link href="/register" className="text-green-600 hover:underline">Sign up</Link></p>
          </form>
          <p className="text-sm text-gray-500">@ Untitled UI 2024</p> 
        </div>
        <div className="bg-gray-100 rounded-r-lg size-full flex items-center justify-center">
          <div className="size-[300px]  relative flex items-center justify-center">
            <div className=" bg-green-600 size-[200px]"/>
            <div className="clip-triangle bg-black bg-opacity-5 mix-blend-overlay backdrop-blur-md size-[250px] absolute top-15 right-15"/>
            {/* <div className="w-0 h-0 border-l-transparent border-r-[200px] border-r-transparent border-b-[200px] border-b-black border-opacity-5 mix-blend-overlay backdrop-blur-md absolute left-50 bottom-50"></div> */}
          </div>
        </div>
      </div>
    </main> 
  );
}
