"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ITEMS_PER_PAGE = 16;

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { accessToken } = useAuth();

  const handleViewProfile = (userId: number) => {
    router.push(`/admin/users/${userId}`); // Navigate to profile page
  };

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/users`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching users:",
            error.response?.status,
            error.response?.data
          );
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken]);

  // Filter users based on search
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page after search
  }, [searchQuery, users]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-xl shadow-md"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <button
                onClick={() => handleViewProfile(user.id)}
                className="mt-2 sm:mt-0 px-3 py-1.5 text-sm rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No users found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 px-2 sm:px-0">
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

export default Users;
