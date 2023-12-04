"use client";

import { ThemeProvider } from "next-themes";
import { ApolloWrapper } from "./ApolloWrapper";
import SessionProvider from "./SessionProvider";
import { RecoilRoot } from "recoil";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <ApolloWrapper>
          <ThemeProvider defaultTheme="system" enableSystem attribute="class">
            {children}
          </ThemeProvider>
        </ApolloWrapper>
      </SessionProvider>
    </RecoilRoot>
  );
};

export default Providers;
