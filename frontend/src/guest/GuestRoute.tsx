import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/dispatch";

export default function GuestRoute() {
  const { accessToken, status } = useAppSelector((state) => state.auth);

  const isAuthenticated = Boolean(accessToken) && status === "authenticated";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}