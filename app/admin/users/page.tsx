import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminUsersForm } from "./AdminUsersForm";
import { getSessionUser } from "@/server/authService";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("auth_session")?.value ?? "";
  const sessionUser = getSessionUser(sessionToken);

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 px-4 py-20">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Benutzerverwaltung
        </h1>
        <AdminUsersForm />
      </div>
    </div>
  );
}

