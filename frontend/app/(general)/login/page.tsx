import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const user = await getCurrentUser();
  console.log("User", user);
  if (user?.role === "USER") {
    redirect("/dashboard"); // server-side redirect
  } else if (user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return <LoginForm />; // your client-side login form component
}
