"use client";

import AdminDashboardContent from "@/components/Dashboard/Admin/AdminDashboardContent";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 pt-28">
        <DashboardHeader userName={user?.name} />
        <div className="lg:px-8">
          <AdminDashboardContent />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
