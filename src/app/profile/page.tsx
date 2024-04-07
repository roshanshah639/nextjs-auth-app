"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      console.log("Logout Successful");
      toast.success("Logout Successful");

      // redirect user to login page
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Profile</h1>
      <div>
        <button
          className="border-none rounded-full px-10 py-2 mt-1 bg-blue-800 hover:bg-blue-700 text-white"
          onClick={onLogout}
          type="button"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Profile;
