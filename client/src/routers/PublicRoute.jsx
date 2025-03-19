/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Nếu người dùng đã đăng nhập và đang cố truy cập login/register -> Chuyển hướng về trang chủ
  if (
    user &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
