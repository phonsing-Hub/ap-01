"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

import Loading from "@/components/Loading";

function page() {
  const { googleLogin } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const code = params.get("code");
    try {
      if (code) {
        googleLogin(code)
          .then(() => {
            // Redirect to the dashboard or home page after successful login
            router.push("/dashboard");
          })
          .catch((error) => {
            console.error("Google login failed:", error);
          });
      } else {
        console.error("No code found in URL parameters");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }, [params]);

  return <Loading />;
}

export default page;
