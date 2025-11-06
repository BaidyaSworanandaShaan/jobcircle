"use client";

import ProfileDetailContent from "@/components/Dashboard/ProfileDetailContent";
import ProfileDetailForm from "@/components/Dashboard/ProfileDetailForm";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/Profile";

import React, { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Profile = () => {
  const { accessToken } = useAuth();
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

  if (loading) {
    return <p className="text-center py-8">Loading...</p>;
  }

  return userData?.profile ? (
    <ProfileDetailContent user={userData} />
  ) : (
    <ProfileDetailForm user={userData} />
  );
};

export default Profile;
