// app/user/layout.tsx
import ProtectedRoute from "@/components/ProtectedRoute";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="user-layout">
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
