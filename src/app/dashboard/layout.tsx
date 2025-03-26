import { AppNavbar } from "@/features/dashboard/components/app-navbar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <AppNavbar user={session.user} />
        <div className="flex flex-1 flex-col gap-4 bg-gray-200 p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
