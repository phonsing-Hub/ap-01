import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar/Sidebar";
import ProtectedRoute from "@/hooks/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard",
};


function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <Sidebar>{children}</Sidebar>
    </ProtectedRoute>
  );
}

export default Layout;
