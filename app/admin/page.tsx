import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Admin Control Center — Ibadan Business Roundtable",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("roundtable_admin_session");

  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
