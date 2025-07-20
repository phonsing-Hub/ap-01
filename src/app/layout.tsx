import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { allFontVars, geistMono } from "@/lib/fonts";
import { LoadingProvider, LoadingBar } from "@/components/LoadingProvider";

import "@/css/globals.css";
import "@/css/red.css";
import "@/css/rose.css";
import "@/css/orange.css";
import "@/css/green.css";
import "@/css/blue.css";
import "@/css/yellow.css";
import "@/css/violet.css";
import "@/css/outher.css";

export const metadata: Metadata = {
  title: {
    default: `TaskFlow`,
    template: `%s - TaskFlow`,
  },
  description: "TaskFlow is a task management system that allows you to manage your tasks and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${allFontVars.map((f) => f.variable).join(" ")} ${
        geistMono.variable
      }`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LoadingProvider>
              <LoadingBar />
              {children}
              <Toaster />
            </LoadingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
