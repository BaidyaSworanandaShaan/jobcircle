"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        setAccessToken(res.data.accessToken);
        setUser(res.data.user);

        const role = res.data.user.role;

        // ---- ROLE BASED REDIRECTION ----

        if (!role) {
          router.replace("/login");
          return;
        }

        if (pathname.startsWith("/admin") && role !== "ADMIN") {
          router.replace("/dashboard");
          return;
        }

        if (pathname.startsWith("/dashboard") && role === "ADMIN") {
          router.replace("/admin/dashboard");
          return;
        }
      } catch (error) {
        console.log("Error refreshing token", error);
        setAccessToken(null);
        setUser(null);

        if (!pathname.startsWith("/login")) {
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken();
  }, [pathname]);

  const login = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setAccessToken(null);
      setUser(null);
      router.replace("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
