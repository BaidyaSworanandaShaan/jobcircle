"use client";

import Link from "next/link";

const WelcomeBox = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm mb-8  ">
      <h2 className="text-2xl font-semibold text-blue-700 mb-2">
        👋 Welcome to Your Dashboard!
      </h2>
      <p className="text-gray-600 text-md leading-7 mb-4">
        Welcome! 🎉 It looks like you’re either logging in for the first time or
        haven’t yet completed your profile. Taking a few minutes to finish
        setting up your account will help us personalize your dashboard, provide
        tailored recommendations, and unlock all the features available to you.
        <br />
        <br />
        Completing your profile ensures you get the most out of your experience
        here, making your journey smooth, enjoyable, and fully tailored to you.
        Let’s get started!
      </p>
      <Link href="/dashboard/profile">
        <button className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 ">
          Complete Your Profile
        </button>
      </Link>
    </div>
  );
};

export default WelcomeBox;
