import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
      {
        method: "GET",
        headers: { Cookie: cookieHeader },
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch current user:", err);
    return null;
  }
}
