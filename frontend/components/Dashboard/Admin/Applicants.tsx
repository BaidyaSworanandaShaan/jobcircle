"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Applicant {
  id: number;
  name: string;
  email: string;
}

interface ApplicantsProps {
  jobId: number;
}

export default function Applicants({ jobId }: ApplicantsProps) {
  const { user, accessToken } = useAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/applications/${jobId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch applicants");

        const data = await res.json();
        console.log("Data: : ", data);
        setApplicants(data.applicants || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [accessToken, user, jobId]);

  if (loading) return <p>Loading applicants...</p>;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Applicants ({applicants.length})
      </h2>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="grid gap-4">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{applicant.name}</p>
                <p className="text-sm text-gray-600">{applicant.email}</p>
              </div>
              <Link
                href={`/admin/users/${applicant.id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
