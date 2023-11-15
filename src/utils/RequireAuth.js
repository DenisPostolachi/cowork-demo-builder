import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import NavBar from "../components/navigation/NavBar";

const RequireAuth = ({ allowedRoles }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  if (currentUser?.user?.role === allowedRoles) {
    return (
      <div>
        <NavBar />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
