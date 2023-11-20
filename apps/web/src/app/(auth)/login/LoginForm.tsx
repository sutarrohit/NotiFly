"use client";

import { Button, InputBox, Label } from "@notifly/ui";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@notifly/lib";
import { FaGoogle } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import { LoginUserMutationDocument } from "@/__generated__/graphql";

const LOGIN_USER = gql`
  mutation loginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

const LoginForm = () => {
  const [loginUser, { data, loading, error }] = useMutation(LoginUserMutationDocument);

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
    <>
      <form
        onSubmit={handleSubmit(DataResponse)}
        className="relative border rounded-lg border-c_Litegrey w-full md:w-[60%] py-10 flex flex-col justify-center gap-3 md:gap-4"
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
            {error && <span className="text-[0.8rem] text-red-500 text-center">{error.message}</span>}
          </div>

          <div className=" flex gap-3 justify-center w-full">
            <Button variant={"primary"} type="submit" size={"small"} className="w-[90%] md:w-[85%] py-2">
              Login
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
    </>
  );
};
export default LoginForm;
