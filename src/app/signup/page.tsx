"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttondisabled, setButtondisabled] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Successful", response.data);
      toast.success("Signup Successful");

      // redirect user to login page
      router.push("/login");
      
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl mb-8">{loading ? "Processing..." : "Signup"}</h1>
      <div className="flex flex-col w-full max-w-sm">
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          className="border-none outline-none  rounded px-2 py-2 mt-1 mb-8 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          className="border-none outline-none  rounded px-2 py-2 mt-1 mb-8 text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        {/* password */}
        <label htmlFor="password">Password</label>
        <input
          className="border-none outline-none  rounded px-2 py-2 mt-1 mb-8 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
      </div>
      <div>
        <button
          className="border-none rounded-full px-10 py-2 mt-1 bg-blue-800 hover:bg-blue-700 text-white"
          onClick={onSignup}
          disabled={buttondisabled}
          type="button"
        >
          {buttondisabled ? "No Signup" : "Signup"}
        </button>
      </div>
      <div className="mt-6">
        <h5 className="text-md">
          Already have an account{" "}
          <Link className="text-blue-300 ml-1" href="/login">
            Login
          </Link>
        </h5>
      </div>
    </main>
  );
};

export default Signup;
