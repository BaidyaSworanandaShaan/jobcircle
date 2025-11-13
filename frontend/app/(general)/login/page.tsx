"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "USER") router.replace("/dashboard");
      else if (user.role === "ADMIN") router.replace("/admin/dashboard");
    }
  }, [user, loading, router]);

  return <LoginForm />;
}
