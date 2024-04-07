"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("Email verified successfully", response.data);
      setVerified(true);
      toast.success(response.data.message);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl">Verify Your Email</h1>
      {verified && (
        <div>
          <h2 className="text-2xl text-green-500 mt-5 text-center">
            Email Verified Successfully.
          </h2>
          <p className="text-2xl text-center mt-5 block mb-5">
            Please
            <Link
              className="mt-5 mb-5 bg-blue-800 rounded-full px-10 py-2 mt-1 text-white ml-4 hover:bg-blue-700"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      )}
      {error && (
        <h2 className="text-2xl text-red-500 mt-5">
          Error verifying email. Please try again
        </h2>
      )}
    </div>
  );
};

export default VerifyEmail;
