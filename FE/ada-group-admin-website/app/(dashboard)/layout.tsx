import { AppSidebar } from "@/src/components/app-sidebar";
import Topbar from "@/src/components/layout/Topbar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex flex-1 flex-col bg-[#F8F9FB] p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
