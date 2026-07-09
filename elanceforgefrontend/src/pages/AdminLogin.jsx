import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminLogin = () => {

  // Password field
  const [password, setPassword] =
    useState("");

  // Password visibility
  const [showPassword, setShowPassword] =
    useState(false);

  // Error message
  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();
  useEffect(() => {

    window.history.pushState(
      null,
      "",
      window.location.href
    );

    const handleBack = () => {

      navigate(
        "/",
        {
          replace: true,
        }
      );

    };

    window.addEventListener(
      "popstate",
      handleBack
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handleBack
      );

    };

  }, [navigate]);

  // Login handler
  const handleLogin = (e) => {

    e.preventDefault();

    if (
      password === "elance123"
    ) {

      localStorage.setItem(
        "adminAuth",
        "true"
      );

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

    } else {

      setError(
        "Wrong Password"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-50 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-6 md:p-8"
      >

        {/* Login icon */}
        <div className="flex justify-center mb-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">

            <LockKeyhole size={30} />

          </div>

        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800">

          Admin Login

        </h1>

        <p className="text-center text-sm text-slate-500 mt-2 mb-6">

          Enter password to access dashboard

        </p>

        {/* Password input */}
        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full h-12 border border-slate-300 rounded-xl px-4 pr-12 outline-none focus:border-orange-500 text-sm"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-orange-500 transition"
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

        {/* Demo password */}
        {/* <p className="text-xs text-center text-slate-500 mt-4">

          Demo Password :

          <span className="font-semibold text-orange-600 ml-1">
            elance123
          </span>

        </p> */}

        {/* Error message */}
        {error && (

          <div className="mt-4 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm text-center">

            {error}

          </div>

        )}

        {/* Login button */}
        <button
          type="submit"
          className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl text-sm font-medium transition"
        >

          Login To Dashboard

        </button>

      </form>

    </div>

  );

};

export default AdminLogin;