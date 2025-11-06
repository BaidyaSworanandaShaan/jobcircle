"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function StatsGrid() {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState<
    { label: string; value: string; href?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/users/stats`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch stats");

        const { data } = await res.json();

        // Map backend data to display format
        setStats([
          {
            label: "Total Jobs",
            value: String(data.totalJobs),
            href: "/jobs",
          },
          {
            label: "Submitted Applications",
            value: String(data.totalApplications),
            href: "/applications",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-xl border border-gray-100"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href || "#"}
          className="rounded-xl border bg-white border-gray-100 p-5 shadow-sm transition hover:shadow-md block"
        >
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            {stat.value}
          </p>
        </Link>
      ))}
    </div>
  );
}
