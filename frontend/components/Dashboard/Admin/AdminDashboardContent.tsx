"use client";

import { AdminStatsGrid } from "./AdminStatsGrid";
import Link from "next/link";
import AdminSearchJob from "./AdminSearchJob";
import AdminEnquiry from "./AdminEnquiry";

const AdminDashboardContent = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 space-y-8">
          <AdminStatsGrid />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AdminSearchJob />{" "}
              <Link href="/admin/jobs/add">
                <button className=" my-5 px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 ">
                  + Add New Job
                </button>
              </Link>
            </div>{" "}
            <div>
              <AdminEnquiry />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardContent;
