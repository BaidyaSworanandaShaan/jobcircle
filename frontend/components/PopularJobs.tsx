import { Job } from "@/types/Job";
import Link from "next/link";
import JobCards from "./JobCards";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export default async function PopularJobs() {
  let jobs: Job[] = [];

  try {
    const res = await fetch(`${BACKEND_URL}/api/jobs`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch jobs, status:", res.status);
    } else {
      jobs = await res.json();
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
  }

  return (
    <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Job Openings
          </h2>
          <p className="text-lg text-gray-600">
            Discover the most sought-after positions from leading companies
          </p>
        </div>

        <JobCards jobs={jobs} />

        {/* View All Jobs */}
        <div className="text-center mt-12">
          <Link href={`/jobs`}>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              View All Jobs
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
