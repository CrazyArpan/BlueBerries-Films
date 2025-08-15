"use client";
import { usePathname } from "next/navigation";
import ClientLayout from "./ClientLayout";
import React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return isAdmin ? <>{children}</> : <ClientLayout>{children}</ClientLayout>;
} 