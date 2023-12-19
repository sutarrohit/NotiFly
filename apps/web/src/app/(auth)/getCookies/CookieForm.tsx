import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { GoogleLoginDocument } from "@/graphql/__generated__/graphql";
import { useRouter } from "next/navigation";
import { Loader } from "@notifly/ui";

const CookieForm = () => {
  const { data: session, status } = useSession();
  const [googleLogin, { data, loading, error }] = useMutation(GoogleLoginDocument);
  const router = useRouter();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (session && session.user && session.user.email) {
        try {
          await googleLogin({
            variables: {
              email: session.user.email,
              sessionToken: undefined,
            },
          });

          if (!loading && status === "authenticated") {
            router.replace("/", { scroll: false });
            router.refresh();
          }
        } catch (error) {
          console.error("Google login error:", error);
        }
      }
    };

    handleGoogleLogin();
  }, [googleLogin, loading, router, session, status]);

  if (session === null) return <>{(router.replace("/", { scroll: false }), router.refresh())}</>;

  return <div className="h-screen flex justify-center items-center">{<Loader />}</div>;
};

export default CookieForm;
