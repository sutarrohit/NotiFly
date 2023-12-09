"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, InputBox, Label } from "@notifly/ui";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@notifly/lib";
import { useMutation } from "@apollo/client";
import { ResetPasswordMutationDocument } from "@/graphql/__generated__/graphql";
import { Loader } from "@notifly/ui";

const ResetPasswordForm = ({ params }: { params: { resetToken: string } }) => {
  const [resetPassword, { data, loading, error }] = useMutation(ResetPasswordMutationDocument);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({ resolver: zodResolver(resetPasswordSchema) });

  const dataResponse = (data: z.infer<typeof resetPasswordSchema>) => {
    resetPassword({
      variables: {
        token: params.resetToken,
        newPassword: data.password,
      },
    });
  };

  if (data !== undefined) {
    setTimeout(() => {
      router.replace("/");
      router.refresh();
    }, 3000);
  }

  return (
    <form
      onSubmit={handleSubmit(dataResponse)}
      className="relative border rounded-lg border-c_Litegrey w-full md:w-[55%] py-6 md:py-10 flex flex-col justify-center gap-2 md:gap-4"
    >
      <h1 className="font-semibold text-xl text-center">Reset Password</h1>
      <h4 className="text-sm text-center my-4">Please enter new password for your account.</h4>

      <div className="flex flex-col justify-center gap-6 items-center">
        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <Label className="">Password</Label>
          <InputBox
            variant={"primary"}
            size={"small"}
            type="password"
            className="w-full py-2"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && <span className="text-[0.8rem]">{errors.password?.message}</span>}
        </div>

        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <Label className="">Confirm Password</Label>
          <InputBox
            variant={"primary"}
            size={"small"}
            type="password"
            className="w-full py-2"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span className="text-[0.8rem]">{errors.confirmPassword?.message}</span>
          )}
          {error && <span className="text-[0.8rem] text-center">{error.message}</span>}
          {data && <span className="text-[0.8rem] text-center">{data?.resetPassword?.status}</span>}
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
    </form>
  );
};
export default ResetPasswordForm;
