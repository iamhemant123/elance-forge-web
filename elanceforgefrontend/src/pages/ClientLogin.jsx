import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LogIn,
} from "lucide-react";

const ClientLogin = () => {

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

  // Login form
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
    });

  // Loading state
  const [loading, setLoading] =
    useState(false);

  // Error message
  const [error, setError] =
    useState("");

  // Input handler
  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // Login request
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      try {

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/client/login`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                formData
              ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {

          throw new Error(
            data.message
          );

        }

        localStorage.setItem(
          "client",
          JSON.stringify(
            data.client
          )
        );

        navigate(
          "/client-dashboard/overview",
          {
            replace: true,
          }
        );

      } catch (error) {

        setError(
          error.message ||
          "Login Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-50 px-4">

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-6 md:p-8">

        {/* Heading */}
        <div className="text-center mb-6">

          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">

            <LogIn
              size={28}
              className="text-orange-500"
            />

          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            User Login
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Login using your registered name and email
          </p>

        </div>

        {/* Error */}
        {error && (

          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">

            {error}

          </div>

        )}

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          {/* Name */}
          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 border border-slate-300 rounded-xl pl-11 pr-4 text-sm outline-none focus:border-orange-500"
            />

          </div>

          {/* Email */}
          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 border border-slate-300 rounded-xl pl-11 pr-4 text-sm outline-none focus:border-orange-500"
            />

          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white rounded-xl text-sm font-medium transition"
          >

            {loading
              ? "Please Wait..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default ClientLogin;