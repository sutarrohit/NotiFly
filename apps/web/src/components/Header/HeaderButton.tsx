"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@notifly/ui";
import { usePathname } from "next/navigation";

const HeaderButton = () => {
  const path = usePathname();

  const buttonRef = useRef<HTMLButtonElement>(null);
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
