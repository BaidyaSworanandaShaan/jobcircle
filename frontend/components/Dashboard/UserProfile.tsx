"use client";

import { User } from "@/types/Profile";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
interface UserProfileContentProp {
  user: User;
}
export function UserProfile({ user }: UserProfileContentProp) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <h3 className="mt-3 text-lg font-semibold text-foreground">
            {user?.profile?.firstName} {user?.profile?.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {user?.profile.gender}
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-3 border-t border-border pt-4">
          <InfoRow icon={<Mail />} label="Email" value={user?.email} />
          <InfoRow
            icon={<MapPin />}
            label="Location"
            value={`${user?.profile?.city} | ${user?.profile?.country}`}
          />
          <InfoRow
            icon={<Phone />}
            label="Contact Number"
            value={user?.profile?.phone}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 border-t border-border pt-4">
          {/* <button
            type="submit"
            className="w-full  bg-yellow-600 text-white rounded-lg px-8 py-3 hover:bg-yellow-700
                    transition-colors font-semibold shadow-sm  flex items-center justify-center gap-2"
          >
            Edit Profile
          </button> */}
          <Link
            href="/dashboard/profile"
            className="w-full  bg-blue-600 text-white rounded-lg px-8 py-3 hover:bg-blue-700
               transition-colors font-semibold shadow-sm text-center flex items-center justify-center gap-2"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
