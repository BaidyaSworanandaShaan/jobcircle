"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ApplyButtonProps {
  jobId: number;
}

export default function ApplyButton({ jobId }: ApplyButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [applied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      router.push(`/dashboard/apply/${jobId}`);
    } catch (error) {
      console.error("Failed to apply:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={applied || loading}
      className={`px-4 py-2 rounded-lg text-white font-semibold ${
        applied
          ? "bg-green-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {applied ? "Applied" : loading ? "Applying..." : "Apply Now"}
    </button>
  );
}
