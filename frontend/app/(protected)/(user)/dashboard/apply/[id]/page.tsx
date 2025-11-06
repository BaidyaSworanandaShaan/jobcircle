"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { Application, Education, Experience, User } from "@/types/Profile";
import { Job } from "@/types/Job";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DashboardApplication = () => {
  const params = useParams();

  const { accessToken } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [openSections, setOpenSections] = useState({
    education: true,
    experience: true,
    skills: true,
    links: true,
  });
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showSnackbar = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 4000);
  };
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;
      try {
        const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [accessToken]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!accessToken) return;
      try {
        const res = await fetch(`${BACKEND_URL}/api/applications`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        console.log(data);
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplications();
  }, [accessToken]);
  console.log(applications);
  const hasApplied = applications?.some(
    (app) => String(app.job.id) === String(params.id) && app.status
  );

  console.log(hasApplied);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      if (!params?.id) return;
      try {
        const res = await fetch(`${BACKEND_URL}/api/jobs/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No user data available.</p>
      </div>
    );
  }

  const { profile } = userData;

  const handleSubmit = async () => {
    if (!accessToken || !params?.id) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/applications/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
      }

      showSnackbar("Application submitted successfully!", "success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        showSnackbar(`Error: ${error.message}`, "error");
      } else {
        console.error(error);
        showSnackbar("An unknown error occurred.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 pt-28">
      <div className="max-w-6xl w-full space-y-6">
        {/* Job Info */}
        {job && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800">
              {job.title}
            </h2>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.jobType}</p>
            {job.salaryRange && (
              <p className="text-gray-600">Salary: {job.salaryRange}</p>
            )}
            <p className="mt-2 text-gray-700">{job.description}</p>
          </div>
        )}

        {/* Application Header */}
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Review Your Application
          </h1>
          <p className="text-gray-600">
            You are applying with the following details. If you want to make any
            changes, please update your profile before submitting.
          </p>
          <hr className="my-6 border-gray-300" />
          {/* Personal Info */}
          <div className="bg-white  rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Full Name:</span>{" "}
              {profile.firstName} {profile.lastName}
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {userData.email}
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {profile.phone}
            </div>
            <div>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {profile.address}, {profile.city}, {profile.country}
            </div>
            <div>
              <span className="font-medium text-gray-700">Date of Birth:</span>{" "}
              {profile.dateOfBirth.split("T")[0]}
            </div>
            <div>
              <span className="font-medium text-gray-700">Gender:</span>{" "}
              {profile.gender}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Bio:</span>{" "}
              {profile.bio}
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          {/* Education */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <button
              type="button"
              onClick={() => toggleSection("education")}
              className="w-full flex justify-between items-center text-gray-700 font-medium mb-2"
            >
              Education {openSections.education ? "▲" : "▼"}
            </button>
            {openSections.education && (
              <div className="space-y-3 pl-2 mb-7 ">
                {profile.education.length ? (
                  profile.education.map((edu: Education, index: number) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-500 pl-2 mb-4"
                    >
                      <p>
                        <span className="font-medium">Degree:</span>{" "}
                        {edu.degree}
                      </p>
                      <p>
                        <span className="font-medium">Institution:</span>{" "}
                        {edu.institution}
                      </p>
                      <p>
                        <span className="font-medium">Year:</span> {edu.year}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No education data</p>
                )}
              </div>
            )}
          </div>
          <hr className="my-6 border-gray-300" />
          {/* Experience */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <button
              type="button"
              onClick={() => toggleSection("experience")}
              className="w-full flex justify-between items-center text-gray-700 font-medium mb-2"
            >
              Experience {openSections.experience ? "▲" : "▼"}
            </button>
            {openSections.experience && (
              <div className="space-y-2 pl-2 mb-7 ">
                {profile.experience.length ? (
                  profile.experience.map((exp: Experience, index: number) => (
                    <div
                      key={index}
                      className="border-l-2 border-green-500 pl-2"
                    >
                      <p>
                        <span className="font-medium">Role:</span> {exp.role}
                      </p>
                      <p>
                        <span className="font-medium">Company:</span>{" "}
                        {exp.company}
                      </p>
                      <p>
                        <span className="font-medium">Years:</span> {exp.years}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No experience data</p>
                )}
              </div>
            )}
          </div>
          <hr className="my-6 border-gray-300" />
          {/* Skills */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <button
              type="button"
              onClick={() => toggleSection("skills")}
              className="w-full flex justify-between items-center text-gray-700 font-medium mb-2"
            >
              Skills {openSections.skills ? "▲" : "▼"}
            </button>
            {openSections.skills && (
              <div className="pl-2 flex flex-wrap gap-2">
                {profile.skills.length ? (
                  profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added</p>
                )}
              </div>
            )}
          </div>
          <hr className="my-6 border-gray-300" />
          {/* Links */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <button
              type="button"
              onClick={() => toggleSection("links")}
              className="w-full flex justify-between items-center text-gray-700 font-medium mb-2"
            >
              Links {openSections.links ? "▲" : "▼"}
            </button>
            {openSections.links && (
              <div className="pl-2 space-y-2">
                <p>
                  <span className="font-medium">Portfolio:</span>{" "}
                  {profile.portfolioURL || "-"}
                </p>
                <p>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  {profile.linkedinURL || "-"}
                </p>
                <p>
                  <span className="font-medium">GitHub:</span>{" "}
                  {profile.githubURL || "-"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-center"
          >
            Edit Profile
          </Link>
          {hasApplied ? (
            <button
              disabled
              className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed text-center"
            >
              Already Applied
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>{" "}
      {snackbar && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-md text-white shadow-md transition-all duration-300 ${
            snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default DashboardApplication;
