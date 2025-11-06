import { User } from "@/types/Profile";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials =
    `${user?.profile?.firstName[0]}${user?.profile?.lastName[0]}`.toUpperCase();

  return (
    <div className="flex items-start gap-6">
      <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-black text-white text-2xl font-bold text-primary-foreground">
        {initials}
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-foreground">
          {user?.profile?.firstName} {user?.profile?.lastName}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {user?.profile?.phone}
        </p>
        <p className="text-sm text-muted-foreground">
          {user?.profile?.city}, {user?.profile?.country}
        </p>
      </div>
    </div>
  );
}
