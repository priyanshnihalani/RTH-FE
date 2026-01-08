  import { useEffect, useState } from "react";
  import { Navigate } from "react-router-dom";
  import { ApiService } from "../Services/ApiService";
  import Cookies from "js-cookie";

  const AuthGuard = ({ children, requireAuth = true }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState("no");

    const checkAuth = async () => {
      setLoading(true);

      const accessToken = Cookies.get("accessToken");
      const waitingToken = Cookies.get("waitingToken");

      try {
        if (accessToken) {
          const res = await ApiService.post("/api/users/auth/me", { accessToken });

          if (res?.status === "approved") {
            Cookies.remove("waitingToken");
            setAuthorized("yes");
            return;
          }
        }

        if (waitingToken) {
          const res = await ApiService.post("/api/users/auth/status", {
            waitingToken,
          });

          if (res?.accessToken) {
            Cookies.set("accessToken", res.accessToken);
            Cookies.remove("waitingToken");
            setAuthorized("yes");
            return;
          }

          if (res?.type === "waiting") {
            setAuthorized("yesno");
            return;
          }
        }

        setAuthorized("no");
      } catch (err) {
        setAuthorized("no");
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {
      checkAuth();
    }, [location.pathname]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Checking authentication...
        </div>
      );
    }

    if (requireAuth && authorized === "no") {
      return <Navigate to="/login" replace />;
    }

    if (!requireAuth && authorized === "yes") {
      return <Navigate to="/" replace />;
    }

    if (requireAuth && authorized === "yesno") {
      return <Navigate to="/waiting" replace />;
    }

    return children;
  };

  export default AuthGuard;
