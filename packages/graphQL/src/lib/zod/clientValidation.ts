import { z, ZodType } from "zod";

export type loginType = {
  email: string;
  password: string;
};

export const loginSchema: ZodType<loginType> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

export type signType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export const signupSchema: ZodType<signType> = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
        message: "Password must contain at least one special character",
      }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password and Confirm Password must be same",
    path: ["confirmPassword"],
  });

export const signupSchemaServer: ZodType<signType> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

export const ZNotificationTokenPrice = z.number();

export type forgotPasswordType = {
  email: string;
};

export const forgotPasswordSchema: ZodType<forgotPasswordType> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type resetPasswordType = {
  password: string;
  confirmPassword?: string;
};

export const resetPasswordSchema: ZodType<resetPasswordType> = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one digit",
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
        message: "Password must contain at least one special character",
      }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password and Confirm Password must be same",
    path: ["confirmPassword"],
  });

export type verifyUser = {
  verificationToken: string;
};

export const verifyUserSchema: ZodType<verifyUser> = z.object({
  verificationToken: z.string(),
});
