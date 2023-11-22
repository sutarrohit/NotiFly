"use client";
import { Button, InputBox, Label } from "@notifly/ui";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@notifly/lib";
import { useMutation } from "@apollo/client";
import { ForgotPasswordMutationDocument } from "@/graphql/__generated__/graphql";
import Loader from "@/lib/Loader";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const [loginUser, { data, loading, error }] = useMutation(ForgotPasswordMutationDocument);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({ resolver: zodResolver(forgotPasswordSchema) });

  const DataResponse = (data: z.infer<typeof forgotPasswordSchema>) => {
    loginUser({
      variables: {
        email: data.email,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(DataResponse)}
      className="relative border rounded-lg border-c_Litegrey w-full md:w-[85%] xl:w-[60%] py-10 flex flex-col justify-center gap-3 md:gap-4"
    >
      <h1 className="font-semibold text-xl text-center">Forgot Password</h1>

      <div className="flex flex-col justify-center gap-7 items-center">
        {/* eslint-disable react/no-unescaped-entities */}
        <p className="text-[0.8rem]">No worries, we'll send you reset instructions.</p>
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
          {error?.message && <span className="text-[0.8rem]">{error?.message}</span>}
          {data?.forgotPassword && <span className="text-[0.8rem">{data?.forgotPassword}</span>}
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
            Reset Password
          </Button>
        </div>
      </div>

      <div className="mt-2 flex justify-center gap-1 items-center text-[0.8rem]">
        {/* eslint-disable react/no-unescaped-entities */}
        <p>Don't have an account yet?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </form>
  );
};
export default ForgotPasswordForm;
