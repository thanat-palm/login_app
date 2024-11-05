"use client"

import React, { useState , useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error , setError] = useState("");
  const [success , setSuccess] = useState("");

  const {data:session} = useSession();
  if(session) redirect("/welcome");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if(password != confirmPassword) {
        setError("Password don not match!");
        return;
    }

    if (!username || !email || !password || !confirmPassword) {
        setError("Please fill all inputs!");
        return;
    }

    try {

      const resCheckUser = await fetch("http://localhost:3000/api/checkuser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
                email
          })
      })

      const {user} = await resCheckUser.json();
      if(user) {
        setError("User already exists!");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username, email, password
          })
      })

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("Registeration Successfully.");
        form.reset();
      } else {
          console.log("User registration failed.")
      }

    } catch(error) {
      console.log("Error during registration: ", error)
    }

  }

  return (
    <div className="bg-gray-300 h-[100vh] w-[100vw] flex items-center">
      <div className="bg-white mx-auto container flex rounded-lg drop-shadow-md">
        <div className="size-full flex flex-col p-5">
          <div className="font-semibold">
            <li className="deco">Untitled UI</li>  
          </div>
          <form className="flex flex-col w-fit mx-auto my-10 justify-center gap-3" onSubmit={handleSubmit}>

            {error && (
              <div className="bg-red-500 text-sm py-2 px-3 text-white rounded-md my-2">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500 text-sm py-2 px-3 text-white rounded-md my-2">
                {success}
              </div>
            )}

            <h1 className="text-3xl font-semibold">Sign up</h1>
            <p className="mr-10 text-gray-500">Please enter your details.</p>
            <div className="">
              <h2>Email</h2>
              <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full h-10 rounded-md border-2 border-gray-300 px-2" placeholder="Enter your email"/>
            </div>
            <div className="">
              <h2>Username</h2>
              <input onChange={(e) => setUsername(e.target.value)} type="text" className="w-full h-10 rounded-md border-2 border-gray-300 px-2" placeholder="Enter your username"/>
            </div>
            <div className="">
              <h2>Password</h2>
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full h-10 rounded-md border-2 border-gray-300 px-2" placeholder="Enter your password"/>
            </div>
            <div className="">
              <h2>Confirm Password</h2>
              <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="w-full h-10 rounded-md border-2 border-gray-300 px-2" placeholder="Confirm your password"/>
            </div>
            
            <button type="submit" className="bg-green-600 w-full py-2 text-white rounded-md">Submit</button>
            <p className="text-center text-sm text-gray-500">If you already have an account? <Link href="/" className="text-green-600 hover:underline">Sign in</Link></p>
          </form>
          <p className="text-sm text-gray-500">@ Untitled UI 2024</p> 
        </div>

      </div>
    </div> 
  )
}

export default RegisterPage
