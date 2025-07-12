"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) return null; 


  return <>{children}</>;
}

export default Layout;