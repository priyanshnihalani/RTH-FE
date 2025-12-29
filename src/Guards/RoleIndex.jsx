import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ApiService } from "../Services/ApiService";

const RoleIndex = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get("/api/users/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  console.log(user)
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "trainer":
      return <Navigate to="/trainer/dashboard" replace />;
    case "trainee":
      return <Navigate to="/trainee/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default RoleIndex;
