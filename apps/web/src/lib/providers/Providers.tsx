"use client";
import { ThemeProvider } from "next-themes";
import { ApolloWrapper } from "./ApolloWrapper";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloWrapper>
      <ThemeProvider defaultTheme="system" enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </ApolloWrapper>
  );
};

export default Providers;
