import React from "react";
import Link from "next/link";
import { Job } from "@/types/Job";

interface JobCardsProps {
  jobs: Job[];
}

const JobCards: React.FC<JobCardsProps> = ({ jobs }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
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
    </div>
  );
};

export default JobCards;
