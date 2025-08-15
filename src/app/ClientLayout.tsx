"use client";
import { usePathname } from "next/navigation";
import FloatingNavBar from "./home/FloatingNavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === "/" || pathname === "/signup" || pathname === "/login";
  return (
    <>
      {!hideNavAndFooter && <FloatingNavBar />}
      {children}
      {!hideNavAndFooter && <Footer />}
      <ScrollToTop />
    </>
  );
} 