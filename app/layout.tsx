"use client";

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { FloatingCartPreview } from "@/components/shared/floating-cart-preview";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ScrollProgress />
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
        <FloatingCartPreview />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
