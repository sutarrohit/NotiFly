"use client";

import { ThemeProvider } from "next-themes";
import { ApolloWrapper } from "./ApolloWrapper";
import SessionProvider from "../SessionProvider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ApolloWrapper>
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          {children}
        </ThemeProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
};

export default Providers;
