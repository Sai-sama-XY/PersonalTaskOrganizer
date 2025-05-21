import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = !!localStorage.getItem("token");

  return isAuth ? children : <Navigate to="/login" replace />;
}
