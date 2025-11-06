"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Applicant {
  applicationId: number;
  id: number;
  name: string;
  email: string;
  appliedAt: string;
  status?: "APPLIED" | "INTERVIEW" | "REJECTED" | "HIRED";
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryRange: string | null;
  dueDate: string;
  experience: string;
}

interface GroupedJob {
  job: Job;
  applicants: Applicant[];
}

const AdminApplications = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState<GroupedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [searchQueries, setSearchQueries] = useState<Record<number, string>>(
    {}
  );
  const [jobSearch, setJobSearch] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/applications`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchApplications();
  }, [accessToken]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCallInterview = async (applicationId: number) => {
    try {
      setUpdatingId(applicationId);

      await axios.patch(
        `${BACKEND_URL}/api/applications/callInterview`,
        { applicationId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // update local state
      setData((prev) =>
        prev.map((group) => ({
          ...group,
          applicants: group.applicants.map((app) =>
            app.applicationId === applicationId
              ? { ...app, status: "INTERVIEW" }
              : app
          ),
        }))
      );
    } catch (error) {
      console.error("Failed to call for interview:", error);
      alert("Failed to call for interview");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="pt-28 text-center">Loading...</p>;

  // filter jobs based on global job search
  const filteredData = data.filter(
    ({ job }) =>
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-2xl font-semibold mb-6">All Job Applications</h1>

      {/* Global Job Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs by title, company, or location..."
          value={jobSearch}
          onChange={(e) => setJobSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {filteredData.length === 0 ? (
        <p className="text-gray-600 text-center">No applications found.</p>
      ) : (
        <div className="space-y-4">
          {filteredData.map(({ job, applicants }, index) => {
            const query = searchQueries[job.id]?.toLowerCase() || "";
            const filteredApplicants = applicants.filter(
              (app) =>
                app.name.toLowerCase().includes(query) ||
                app.email.toLowerCase().includes(query)
            );
            console.log(filteredApplicants);
            return (
              <div
                key={job.id}
                className="rounded-xl border bg-white border-gray-100 p-5 shadow-sm transition hover:shadow-md cursor-pointer"
              >
                {/* Job Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      Applicants:{" "}
                      <span className="font-semibold text-gray-800">
                        {applicants.length}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Applicants Section */}
                {openIndex === index && (
                  <div className="border-t border-gray-100 bg-white px-5 py-3 animate-fadeIn">
                    {/* Applicant Search Input */}
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      value={searchQueries[job.id] || ""}
                      onChange={(e) =>
                        setSearchQueries((prev) => ({
                          ...prev,
                          [job.id]: e.target.value,
                        }))
                      }
                      className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {filteredApplicants.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No applicants match the search.
                      </p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {filteredApplicants.map((app) => (
                          <li
                            key={app.applicationId}
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2"
                          >
                            <div>
                              <p className="font-medium text-gray-800">
                                {app.name}
                                {app.status === "INTERVIEW" && (
                                  <span className="ml-2 text-green-600 text-sm font-medium">
                                    Interview Called
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-500">
                                {app.email}
                              </p>
                              <p className="text-xs text-gray-400">
                                Applied:{" "}
                                {new Date(app.appliedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <div className="flex gap-2 mt-2 sm:mt-0">
                              <button
                                className={`px-3 py-1.5 text-sm rounded-lg text-white transition ${
                                  app.status === "INTERVIEW"
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                                onClick={() =>
                                  app.status !== "INTERVIEW" &&
                                  handleCallInterview(app.applicationId)
                                }
                                disabled={
                                  updatingId === app.applicationId ||
                                  app.status === "INTERVIEW"
                                }
                              >
                                {app.status === "INTERVIEW"
                                  ? "Interview Called"
                                  : updatingId === app.applicationId
                                  ? "Calling..."
                                  : "Call for Interview"}
                              </button>
                              <button
                                className="px-3 py-1.5 text-sm rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
                                onClick={() =>
                                  window.open(
                                    `/admin/users/${app.id}`,
                                    "_blank"
                                  )
                                }
                              >
                                View Profile
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
