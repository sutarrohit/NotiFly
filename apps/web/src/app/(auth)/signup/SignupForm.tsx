"use client";
import { Button, InputBox, Label } from "@notifly/ui";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@notifly/lib";
import { FaGoogle } from "react-icons/fa";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({ resolver: zodResolver(signupSchema) });

  const dataResponse = (data: z.infer<typeof signupSchema>) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(dataResponse)}
      className="relative border rounded-lg border-c_Litegrey w-full md:w-[60%] py-6 md:py-10 flex flex-col justify-center gap-2 md:gap-4"
    >
      <h1 className="font-semibold text-xl text-center">Create an account</h1>

      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <Label className="">Email</Label>
          <InputBox
            variant={"primary"}
            size={"small"}
            className="w-full py-2"
            placeholder="n@example.com"
            {...register("email")}
          />
          {errors.email?.message && (
            <span className="text-[0.8rem] text-red-500">{errors.email?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <Label className="">Password</Label>
          <InputBox
            variant={"primary"}
            size={"small"}
            className="w-full py-2"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && (
            <span className="text-[0.8rem] text-red-500">{errors.password?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-[90%] md:w-[85%]">
          <Label className="">Confirm Password</Label>
          <InputBox
            variant={"primary"}
            size={"small"}
            className="w-full py-2"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span className="text-[0.8rem] text-red-500">{errors.confirmPassword?.message}</span>
          )}
        </div>

        <div className=" flex gap-3 justify-center w-full">
          <Button variant={"primary"} type="submit" size={"small"} className="w-[90%] md:w-[85%] py-2">
            Sign Up
          </Button>
        </div>
      </div>

      <p className="text-center text-c_Litegrey text-[0.8rem] before:content-['──────────__'] after:content-['__──────────'] ">
        OR CONTINUE WITH
      </p>

      <div className=" flex gap-3 justify-center w-full">
        <Button variant={"primary"} size={"small"} className="w-[90%] md:w-[85%] py-2">
          <FaGoogle className="mr-2 text-xl" /> Google
        </Button>
      </div>
    </form>
  );
};
export default SignupForm;
