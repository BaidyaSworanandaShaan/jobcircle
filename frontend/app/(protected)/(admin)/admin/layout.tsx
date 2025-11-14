// app/admin/layout.tsx
import ProtectedRoute from "@/components/ProtectedRoute";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="admin-layout">
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
