"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AdminDeleteButtonProps {
  jobId: number;
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const AdminDeleteButton = ({ jobId }: AdminDeleteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const { accessToken } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      console.log(jobId);
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res);
      if (!res.ok) throw new Error("Failed to delete job");

      alert("Job deleted successfully ✅");
      router.push("/dashboard/jobs");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="w-4 h-4" />
          Delete Job
        </>
      )}
    </button>
  );
};

export default AdminDeleteButton;
