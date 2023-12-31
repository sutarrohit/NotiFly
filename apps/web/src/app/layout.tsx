import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../lib/providers/Providers";
import { Header, Footer, Sidebar } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NotiFly",
  description: "Cryptocurrency price notification platform.",
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} bg-c_White text-c_black dark:bg-c_black dark:text-c_White relative`}
      >
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Providers>
          <ToastContainer />
          <Sidebar />
          <Header />

          {children}
          {modal}
          <Footer />
        </Providers>

        {/* </Suspense> */}
      </body>
    </html>
  );
}
