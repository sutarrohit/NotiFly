"use client";

import Link from "next/link";
import { Button } from "@notifly/ui";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { deleteFromStorage } from "@rehooks/local-storage";
import { UserLogoutDocument } from "@/graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DarkMode } from "@notifly/ui";

const HeaderButton = ({ token }: { token: string }) => {
  const path = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const [userLogout, { data, loading, error }] = useMutation(UserLogoutDocument);

  const logOutUser = () => {
    if (session) {
      signOut();
    }
    deleteFromStorage("authToken");
    userLogout({
      variables: {
        email: session?.user?.email,
      },
    });

    router.replace("/", { scroll: false });
    router.refresh();
  };

  return (
    <>
      {token ? (
        <Button onClick={() => logOutUser()} variant={"secondary"} size={"small"}>
          Log Out
        </Button>
      ) : (
        <div className=" flex gap-3">
          {path !== "/login" ? (
            <Link href="/login">
              <Button variant={"secondary"} size={"small"}>
                Log In
              </Button>
            </Link>
          ) : (
            ""
          )}

          {path !== "/signup" ? (
            <Link href="/signup">
              <Button variant={"primary"} size={"small"}>
                Sign Up
              </Button>
            </Link>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
export default HeaderButton;
