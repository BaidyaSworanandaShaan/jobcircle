import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard"); // server-side redirect for logged-in users
  }

  return <RegisterForm />;
}
