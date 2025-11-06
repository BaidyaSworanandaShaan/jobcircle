"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import ProfileDetailContent from "@/components/Dashboard/ProfileDetailContent";
import { User } from "@/types/Profile";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// interface Education {
//   degree: string;
//   institution: string;
//   year: string;
// }

// interface Experience {
//   company: string;
//   role: string;
//   years: string;
// }

// interface Profile {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   bio: string;
//   dateOfBirth: string;
//   gender: string;
//   education: Education[];
//   experience: Experience[];
//   skills: string[];
//   portfolioURL: string;
//   linkedinURL: string;
//   githubURL: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   profile: Profile;
// }

const UserProfile = () => {
  const params = useParams();
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/users/${params.id}/admin`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [accessToken, params.id]);

  if (loading) return <p>Loading user profile...</p>;
  if (!user) return <p>User not found</p>;

  return <ProfileDetailContent user={user} />;
};

export default UserProfile;
