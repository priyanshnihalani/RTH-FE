import { Navigate } from "react-router-dom";

const ApprovalGuard = ({ user, children }) => {
  if (user.status === "pending") {
    return <Navigate to="/waiting" replace />;
  }

  return children;
};

export default ApprovalGuard;
