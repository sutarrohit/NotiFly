import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../lib/providers/Providers";
// import { getServerSession } from "next-auth";
// import SessionProvider from "../lib/SessionProvider";
import { Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const sesssion = await getServerSession();
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} bg-c_White text-c_black dark:bg-c_black dark:text-c_White relative`}
      >
        {/* <SessionProvider session={sesssion}> */}
        <Providers>
          <Header />
          {children}
        </Providers>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
