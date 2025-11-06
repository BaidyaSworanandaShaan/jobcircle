"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import DashboardContent from "@/components/Dashboard/DashboardContext";
import WelcomeBox from "@/components/Dashboard/WelcomeBox";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { User } from "@/types/Profile";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DashboardPage = () => {
  const { user, accessToken } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 pt-28">
        <DashboardHeader userName={user?.name} />
        {loading ? (
          <p>Loading...</p>
        ) : userData?.profile ? (
          <>
            <DashboardContent user={userData} />
          </>
        ) : (
          <WelcomeBox />
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
