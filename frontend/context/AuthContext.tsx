"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken();
  }, []);

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
