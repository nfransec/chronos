import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/globals.css';
import SideBarNav from "@/components/SideBarNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chronos",
  description: "CSIRT Shift Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <SideBarNav />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
