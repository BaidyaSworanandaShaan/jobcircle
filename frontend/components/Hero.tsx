"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [location] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (jobTitle) params.append("search", jobTitle);
    if (location) params.append("location", location);

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-blue-50 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Headings */}
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Your <span className="text-blue-600">Dream Job </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search thousands of jobs from top companies. Your next opportunity
            awaits.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white shadow-md rounded-xl p-4 sm:p-6 border border-gray-200 relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Job Title */}
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="flex-1 pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="md:w-auto w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Search Jobs
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
