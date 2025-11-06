"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AdminStatsGrid() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<
    { label: string; value: string; href: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!res.ok) throw new Error("Failed to fetch admin stats");

        const { data } = await res.json();

        setStats([
          {
            label: "Total Users",
            value: String(data.totalUsers),
            href: "/admin/users",
          },
          {
            label: "Total Jobs",
            value: String(data.totalJobs),
            href: "/admin/jobs",
          },
          {
            label: "Total Submitted Applications",
            value: String(data.totalApplications),
            href: "/admin/applications",
          },
          {
            label: "Total Enquiry",
            value: String(data.totalEnquiry),
            href: "/admin/enquiry",
          },
        ]);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-xl border border-gray-100"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          onClick={() => router.push(stat.href)}
          className="rounded-xl border bg-white border-gray-100 p-5 shadow-sm transition hover:shadow-md cursor-pointer"
        >
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
