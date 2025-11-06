"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Enquiry {
  id: number;
  fullName: string;
  emailAddress: string;
  subject: string;
  message: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 5;

const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { accessToken } = useAuth();

  // Fetch all enquiries once
  useEffect(() => {
    const fetchEnquiries = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(`${BACKEND_URL}/api/enquiry`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch enquiries");

        const data = await res.json();
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [accessToken]);

  // Calculate paginated data
  const totalPages = Math.ceil(enquiries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEnquiries = enquiries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-sm ">
      <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Enquiries</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {paginatedEnquiries.length > 0 ? (
          paginatedEnquiries.map((enquiry) => (
            <div key={enquiry.id} className="px-6 py-4 hover:bg-gray-50">
              <p className="text-sm text-gray-800 font-medium">
                {enquiry.fullName}
                <span className="text-gray-500 block">
                  {enquiry.emailAddress}
                </span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-semibold">Subject:</span>{" "}
                {enquiry.subject}
              </p>
              <p className="text-sm text-gray-600 mt-1">{enquiry.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(enquiry.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No enquiries found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiry;
