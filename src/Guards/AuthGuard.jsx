import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ApiService } from "../Services/ApiService";
import Cookies from "js-cookie";

const AuthGuard = ({ children, requireAuth = true }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState("no");
  const location = useLocation();

  const checkAuth = async () => {
    try {
      setLoading(true);

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        setAuthorized("no");
        return;
      }

      const res = await ApiService.post(
        "/api/users/auth/me",
        { accessToken }
      );


      if (res.status === "approved") {
        setAuthorized("yes");
        return;
      }

      setAuthorized("no");

    } catch (err) {

      try {
        const waitingToken = Cookies.get("waitingToken");

        if (!waitingToken) {
          setAuthorized("no");
          return;
        }


        const res = await ApiService.post(
          "/api/users/auth/status",
          { waitingToken }
        );


        if (res.type === "waiting") {
          setAuthorized("yesno");
        } 
        else if (res.type === "auth") {
          Cookies.set("accessToken", res.accessToken, {
            expires: 1,
            sameSite: "lax",
          });
          Cookies.remove("waitingToken");
          setAuthorized("yes");
        } 
        else {
          setAuthorized("no");
        }

      } catch {
        setAuthorized("no");
      }
    } finally {
      setLoading(false);
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
