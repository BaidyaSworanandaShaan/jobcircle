import { User } from "@/types/Profile";
import React, { useState } from "react";
import ProfileDetailForm from "./ProfileDetailForm";
import { ProfileHeader } from "../Profile/ProfileHeader";
import { ProfileBio } from "../Profile/ProfileBio";
import { EducationSection } from "../Profile/EducationSection";
import { ExperienceSection } from "../Profile/ExperienceSection";
import { SkillsSection } from "../Profile/SkillsSection";
import { SocialLinks } from "../Profile/SocialLinks";
import { useAuth } from "@/context/AuthContext";

interface ProfileDetailContentProps {
  user: User;
}

const ProfileDetailContent = ({ user }: ProfileDetailContentProps) => {
  const { user: originalUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    // Show form when editing
    return <ProfileDetailForm user={user} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
        {/* Header with Edit Button */}

        {user?.profile ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <ProfileHeader user={user} />
              {originalUser?.role === "USER" && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Sections */}
            <div className="mt-12 space-y-12">
              <ProfileBio bio={user?.profile?.bio} />
              <EducationSection education={user?.profile?.education} />
              <ExperienceSection experience={user?.profile?.experience} />
              <SkillsSection skills={user?.profile?.skills} />
              <SocialLinks profile={user?.profile} />
            </div>
          </>
        ) : (
          "No Profile Detail Found"
        )}
      </div>
    </main>
  );
};

export default ProfileDetailContent;
