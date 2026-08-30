import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MedicalTermsManager } from "./MedicalTermsManager";
import { getSessionUser } from "@/server/authService";

export default async function AdminMedicalTermsPage() {
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
      <MedicalTermsManager />
    </div>
  );
}

