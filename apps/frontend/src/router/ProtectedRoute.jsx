import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ redirectTo = "/VillageLogin", role }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("unauthorized");
        return;
      }

      try {
    const res = await fetch("http://localhost:3000/api/users/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (role && data.user.role !== role) {
          setStatus("unauthorized");
        } else {
          setStatus("authorized");
        }
      } catch {
        setStatus("unauthorized");
      }
    };

    verifyUser();
  }, [role]);

  if (status === "loading") return null;
  if (status === "unauthorized") return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
