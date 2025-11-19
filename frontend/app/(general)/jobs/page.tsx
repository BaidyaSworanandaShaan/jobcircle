import JobsList from "@/components/JobList";
import { Job } from "@/types/Job";
import React from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface JobsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const fetchJobs = async (): Promise<Job[]> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/jobs`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      console.error("Failed to fetch jobs, status:", res.status);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return [];
  }
};

const Jobs = async ({ searchParams }: JobsPageProps) => {
  const searchParam =
    typeof searchParams?.search === "string" ? searchParams.search : "";
  const jobs = await fetchJobs();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-28">
      <h1 className="text-3xl font-bold mb-8 text-center">All Job Openings</h1>
      <JobsList jobs={jobs} searchParam={searchParam} />
    </div>
  );
};

export default Jobs;
