import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../utils/SessionProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fan.io",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        url: '/images/favicon_logo.png',
        href: '/images/favicon_logo.png',
      }
    ]
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
          <Navbar />
        {children}
        </div>
        </SessionProvider>
      </body>
    </html>
  );
}
