/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const local_url = import.meta.env.VITE_LOCAL_URL;
    // Tạo object data từ email và password
    const data = {
      username: email, // Nếu backend dùng `username`, đổi `email` thành `username`
      password: password,
    };
    try {
      const response = await axios.post(`${local_url}/api/auth/admin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token has been expired!, Please login again.");
          navigate("/");
        }, 3600 * 1000);
      }
      localStorage.setItem("user", JSON.stringify(auth));
      console.log("login success");
      alert("Admin Login successful!");
      navigate("/dashboard", { state: auth.user });
      console.log("Navigating with state:", auth.user);
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 ">
      <div className="bg-white text-gray-700 p-10 rounded-lg shadow-lg w-full sm:w-96  text-sm max-w-sm mx-auto -translate-y-[150px]">
        <h2 className="text-3xl font-semibold text-center mb-3 text-black">
          Admin
        </h2>
        <p className="text-center text-sm mb-6">Login with Admin Account</p>
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
              type="text"
              placeholder="Your Email Address"
              required
              className="bg-transparent outline-none w-full"
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
              className="bg-transparent outline-none w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
