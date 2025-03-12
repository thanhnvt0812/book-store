/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up") {
      console.log("Sign Up" + email + ", " + password);
    } else {
      console.log("Login" + email + ", " + password);
    }
  };
  const handleGoogle = async (e) => {
    e.preventDefault();
    if (state === "Sign Up") {
      console.log("Google Sign Up");
    } else {
      console.log("Google Login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 ">
      <div className="bg-white text-gray-700 p-10 rounded-lg shadow-lg w-full sm:w-96  text-sm max-w-sm mx-auto -translate-y-[150px]">
        <h2 className="text-3xl font-semibold text-center mb-3 text-black">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create your account" : "Login to you account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#e6e9f7]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Your Email Address"
              required
              className="bg-transparent outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#e6e9f7]">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="Your Password"
              required
              className="bg-transparent outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-ws mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-ws mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
        <div className="mt-4">
          <button
            onClick={handleGoogle}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            {state === "Sign Up"
              ? "Sign Up with Google"
              : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
