import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const checkToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!state.isAuthenticated && !checkToken) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuthenticated, navigate]);

  // Show nothing or a loader while checking authentication
  if (!state.isAuthenticated) {
    return null; // Or return a loading spinner
  }

  return <>{children}</>;
}
