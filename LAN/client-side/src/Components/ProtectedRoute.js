import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
function ProtectedRoute() {
  const token = Cookies.get("session_token");
  console.log("Token : ", token);
  if (token) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default ProtectedRoute;
