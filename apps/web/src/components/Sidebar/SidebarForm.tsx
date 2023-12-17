"use client";
import { useRecoilState } from "recoil";
import { openSideMenu } from "@notifly/recoil";
import { FaWindowClose } from "react-icons/fa";
import { DarkMode } from "@notifly/ui";
import Link from "next/link";
import { Button } from "@notifly/ui";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { UserLogoutDocument } from "@/graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { IoLogoStencil } from "react-icons/io5";

const SidebarForm = ({ token }: { token: string }) => {
  const [sideMenu, setSideMenu] = useRecoilState(openSideMenu);
  const router = useRouter();

  const { data: session } = useSession();
  const [userLogout, { data, loading, error }] = useMutation(UserLogoutDocument);

  const logOutUser = () => {
    if (session) {
      signOut();
    }
    userLogout({
      variables: {
        email: session?.user?.email,
      },
    });

    router.replace("/", { scroll: false });
    router.refresh();
  };

  return (
    <div>
      <div
        className={`md:hidden fixed top-0 bottom-0 w-[80%] sm:w-1/2 z-20  bg-c_black text-c_White dark:bg-c_grey opacity-[97%]  ${
          sideMenu ? "translate-x-[0px]" : "translate-x-[-450px]"
        } transition ease-in-out duration-700
      `}
      >
        <div className="flex border-b border-c_grey items-center justify-between py-[0.95rem] px-3 text-2xl font-bold">
          <div className="flex items-center gap-1">
            <IoLogoStencil />
            <h1>Notifly</h1>
          </div>

          <div className="flex items-center gap-5">
            <DarkMode />

            <FaWindowClose
              onClick={() => {
                setSideMenu(false);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center font-semibold mt-5 py-2 gap-3">
          <Link
            onClick={() => {
              setSideMenu(!sideMenu);
            }}
            href="/myNotification"
          >
            My Notification
          </Link>
          <Link
            onClick={() => {
              setSideMenu(!sideMenu);
            }}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              setSideMenu(!sideMenu);
            }}
            href="/about"
          >
            About
          </Link>
          <Link
            onClick={() => {
              setSideMenu(!sideMenu);
            }}
            href="/contactus"
          >
            Contact us
          </Link>
        </div>

        <div className="flex flex-col mt-7 gap-5 items-center">
          {token ? (
            <Button
              onClick={() => {
                logOutUser(), setSideMenu(!sideMenu);
              }}
              variant={"secondary"}
              size={"small"}
              className="hover:bg-black bg-c_black text-white font-bold w-1/2 py-1.5"
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  router.push("/signup"), setSideMenu(!sideMenu);
                }}
                variant={"secondary"}
                size={"small"}
                className="bg-c_White dark:hover:bg-c_White dark:text-black hover:text-black font-bold w-1/2"
              >
                Sign up
              </Button>
              <Button
                onClick={() => {
                  router.push("/login"), setSideMenu(!sideMenu);
                }}
                variant={"secondary"}
                size={"small"}
                className="hover:bg-black bg-c_black text-white font-bold w-1/2"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarForm;
