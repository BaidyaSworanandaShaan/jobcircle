"use client";

import { User } from "@/types/Profile";
import { StatsGrid } from "@/components/Dashboard/StatsGrid";
import JobSearch from "@/components/Dashboard/JobSearch";
import { UserProfile } from "./UserProfile";

interface DashboardContentProps {
  user: User;
}
const DashboardContent = ({ user }: DashboardContentProps) => {
  console.log(user);
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 space-y-8">
          <StatsGrid />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <JobSearch />
            </div>
            <div>
              <UserProfile user={user} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
