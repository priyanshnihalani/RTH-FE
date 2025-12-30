import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ApiService } from "../Services/ApiService";
import Cookies from "js-cookie";

const AuthGuard = ({ children, requireAuth = true }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState("no");
  const location = useLocation();

  const checkAuth = async () => {
    setLoading(true)
    const accesscookies = Cookies.get("accessToken")
    const waitingcookies = Cookies.get("accessToken")

    try {
      await ApiService.post("/api/users/auth/me", {
        accessToken: accesscookies
      });
      Cookies.remove(waitingcookies)
      setAuthorized("yes")
    }
    catch (err) {
      try {
        await ApiService.post("/api/users/auth/status", {
          waitingToken: waitingcookies
        })
        setAuthorized("no")
      }
      catch (err) {
        console.log(err)
        setAuthorized("no")
      }
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  /* ============ LOADING ============ */
  if (loading) return null;

  /* ============ ROUTE GUARD ============ */
  if (requireAuth && authorized === "no") {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && authorized === "yes") {
    return <Navigate to="/" replace />;
  }

  if (authorized === "yesno") {
    return <Navigate to="/waiting" replace />;
  }

  return children;
};

export default AuthGuard;
