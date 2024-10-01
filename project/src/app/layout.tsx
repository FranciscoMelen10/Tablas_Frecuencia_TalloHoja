import type { Metadata } from "next";
import "./globals.css";
import { Saira } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Estadistica - FranciscoMelen10",
  description: "Estadistica - FranciscoMelen10",
  icons: {
    icon: "/Logo.ico",
  }
};

const getSarai = Saira({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={getSarai.className}>
        <main className="flex flex-col bg-black text-white p-5 ">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
