"use client";

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <>
      {/* Welcome Message */}
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="mt-6 bg-blue-50 p-6 rounded-lg shadow-sm text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back{userName ? `, ${userName}` : "!"} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to explore new opportunities today? 🚀
          </p>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
