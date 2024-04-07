"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttondisabled, setButtondisabled] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response.data);
      toast.success("Login Successful");

      // redirect user to profile page
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl mb-8">{loading ? "Processing..." : "Login"}</h1>
      <div className="flex flex-col w-full max-w-sm">
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
          onClick={onLogin}
          type="button"
        >
          {buttondisabled ? "No Login" : "Login"}
        </button>
      </div>
      <div className="mt-6">
        <h5 className="text-md">
          New to website
          <Link className="text-blue-300 ml-1" href="/signup">
            Signup
          </Link>
        </h5>
      </div>
    </main>
  );
};

export default Login;
