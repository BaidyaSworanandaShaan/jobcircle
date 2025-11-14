"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login"); // not logged in
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // role not allowed
        router.replace("/dashboard");
      }
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) return <div>Loading...</div>; // show spinner/loading
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) return null; // prevent flashing

  return <>{children}</>;
}
