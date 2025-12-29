import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ApiService } from "../Services/ApiService";

const AuthGuard = ({ children, requireAuth = true }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState("");
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    ApiService.get("/api/users/auth/me")
      .then((res) => {
        setAuthorized(res?.status === "approved" ? "yes" : "no");
      })
      .catch(() => ApiService.get("/api/users/auth/status").then((res) => {
        setAuthorized(res?.status === "pending" ? "yesno" : "no");
      }).catch(() => {
        setAuthorized("no")
      }))
      .finally(() => setLoading(false));
  }, [location.pathname]);

  if (loading) return null;

  if (requireAuth && authorized == "no") {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && authorized == "yes") {
    return <Navigate to="/" replace />;
  }

  if (authorized == "yesno") {
    return <Navigate to="/waiting" replace />;
  }

  return children;
};

export default AuthGuard;
