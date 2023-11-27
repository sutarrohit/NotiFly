import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { GoogleLoginDocument } from "@/graphql/__generated__/graphql";
import { useRouter } from "next/navigation";
import Loader from "@/lib/Loader";
import { writeStorage, useLocalStorage } from "@rehooks/local-storage";

const CookieForm = () => {
  const { data: session, status } = useSession();
  const [googleLogin, { data, loading, error }] = useMutation(GoogleLoginDocument);
  const router = useRouter();
  const [authToken] = useLocalStorage("authToken");

  useEffect(() => {
    if (session && session.user && session.user.email && !authToken) {
      googleLogin({
        variables: {
          email: session?.user?.email,
          sessionToken: undefined,
        },
      });
      if (!loading) {
        writeStorage("authToken", true);
        router.push("/", { scroll: false });
      }
    }
  }, [session]);

  if (session === null) return <>{router.push("/", { scroll: false })}</>;
  if (session && authToken && !loading) return <>{router.push("/", { scroll: false })}</>;

  return <div className="h-screen flex justify-center items-center">{<Loader />}</div>;
};

export default CookieForm;
