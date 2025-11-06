"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Job } from "@/types/Job";
import Link from "next/link";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const res = await fetch(`${BACKEND_URL}/api/jobs`, {
  next: { revalidate: 60 }, // re-generate every 60 seconds
});
if (!res.ok) throw new Error("Failed to fetch jobs");
const jobs: Job[] = await res.json();

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Trending Jobs</h2>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Search Input */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-gray-100 p-4 hover:bg-blue-50/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">
                      {job.company} • {job.location}
                    </p>
                    <p className="mt-2 text-sm font-medium text-blue-600">
                      $ {job.salaryRange}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Array.isArray(job?.skillsRequired) &&
                        job.skillsRequired.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <button className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700">
                      View Detail
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 py-8">
              No jobs found matching your search.
            </p>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
