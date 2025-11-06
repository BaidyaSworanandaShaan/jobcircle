"use client";

import { useState } from "react";
import Link from "next/link";
import { Job } from "@/types/Job";

interface JobsListProps {
  jobs: Job[];
  searchParam: string;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, searchParam }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParam); // search term
  const limit = 6; // jobs per page

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    [job.title, job.company, job.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={search}
          onChange={handleSearchChange}
          className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Job Info */}
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {job.title}
            </h3>
            <p className="text-gray-500 mb-4">{job.company}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                {job.jobType}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                {job.location}
              </span>
            </div>

            {/* Bottom Row: Salary & View Detail */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-blue-600 font-semibold">
                ${job.salaryRange}
              </span>
              <Link href={`/jobs/${job.id}`}>
                <button className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700">
                  View Detail
                </button>
              </Link>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No jobs found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsList;
