"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@notifly/ui";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const HeaderButton = () => {
  const path = usePathname();
  const { data: session } = useSession();
  console.log("session", session);

  if (session)
    return (
      <Button onClick={() => signOut()} variant={"secondary"} size={"small"}>
        Log Out
      </Button>
    );

  return (
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
  );
};
export default HeaderButton;
