"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Application } from "@/types/Profile";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Applications = () => {
  const { accessToken } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/applications`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();
        setApplications(data);
        setFilteredApps(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [accessToken]);

  useEffect(() => {
    const filtered = applications.filter(
      (app) =>
        app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchQuery, applications]);

  if (loading) return <p className="pt-28 text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-28">
      <h1 className="text-2xl font-semibold mb-6">Your Applications</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by job title, company, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {filteredApps.length === 0 ? (
        <p className="text-center text-gray-600">No applications found.</p>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.applicationId}
              className="rounded-xl border bg-white border-gray-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {app.job.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {app.job.company} • {app.job.location}
                  </p>
                  <p className="text-xs text-gray-400">
                    Applied:{" "}
                    {new Date(app.appliedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                    app.status === "APPLIED"
                      ? "bg-gray-200 text-gray-800"
                      : app.status === "INTERVIEW"
                      ? "bg-green-100 text-green-800"
                      : app.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
