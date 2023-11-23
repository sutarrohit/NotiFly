"use client";
import { Button, InputBox, Label } from "@notifly/ui";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@notifly/lib";
import { useMutation } from "@apollo/client";
import { LoginUserMutationDocument } from "@/graphql/__generated__/graphql";
import Loader from "@/lib/Loader";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [loginUser, { data, loading, error }] = useMutation(LoginUserMutationDocument);

  const searchParams = useSearchParams();
  const callbackUrl = "/";

  console.log(callbackUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const DataResponse = (data: z.infer<typeof loginSchema>) => {
    loginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(DataResponse)}
      className="relative border rounded-lg border-c_Litegrey w-full md:w-[85%] xl:w-[65%] py-10 flex flex-col justify-center gap-3 md:gap-4"
    >
      <h1 className="font-semibold text-xl text-center">Log in to NotiFly</h1>

      <div className="flex flex-col justify-center gap-5 items-center">
        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <Label className="">Email</Label>
          <InputBox
            variant={"primary"}
            size={"small"}
            className="w-full py-2"
            placeholder="n@example.com"
            {...register("email")}
          />
          {errors.email?.message && <span className="text-[0.8rem]">{errors.email?.message}</span>}
        </div>

        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <div className="flex justify-between items-center">
            <Label className="">Password</Label>
            <Link href="/forgotPassword" className="text-[0.8rem] font-medium">
              Forgot Password?
            </Link>
          </div>

          <InputBox
            variant={"primary"}
            size={"small"}
            type="password"
            className="w-full py-2"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && <span className="text-[0.8rem]">{errors.password?.message}</span>}
          {error && <span className="text-[0.8rem] text-center">{error.message}</span>}
        </div>

        <div className=" flex gap-3 justify-center w-full">
          <Button
            variant={"primary"}
            type="submit"
            size={"small"}
            className="w-[90%] md:w-[85%] py-2"
            disabled={loading}
          >
            {loading && <Loader />}
            Login
          </Button>
        </div>
      </div>
      <p className="text-center text-c_Litegrey text-[0.8rem] before:content-['──────────__'] after:content-['__──────────'] ">
        OR CONTINUE WITH
      </p>

      <div className=" flex gap-3 justify-center w-full">
        <Button
          onClick={() => signIn("google")}
          variant={"primary"}
          size={"small"}
          className="w-[90%] md:w-[85%] py-2"
        >
          <FaGoogle className="mr-2 text-xl" /> Google
        </Button>
      </div>

      <div className="mt-2 flex justify-center gap-1 items-center text-[0.8rem]">
        {/* eslint-disable react/no-unescaped-entities */}
        <p>Don't have an account yet?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </form>
  );
};
export default LoginForm;
