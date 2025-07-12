"use client";
import { useState, useContext, createContext } from "react";
import { motion } from "framer-motion";

const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (state: boolean) => void;
}>({ loading: false, setLoading: () => {} });

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export function LoadingBar() {
  const { loading } = useLoading();
  if (loading)
    return (
      <motion.div
        className="fixed top-0 left-0 h-1 w-full z-50 bg-gradient-to-r from-slate-400 via-blue-500 to-sky-400 bg-[length:200%_100%]"
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
          backgroundPosition: "200% 0",
        }}
      />
    );
}
