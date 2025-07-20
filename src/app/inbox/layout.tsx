import React from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import ProtectedRoute from "@/hooks/ProtectedRoute";

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