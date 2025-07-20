import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default Layout;
