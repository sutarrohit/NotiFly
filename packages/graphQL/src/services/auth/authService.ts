import { prismaClient } from "@notify/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { IcreateUser, IloginUser } from "@notifly/interfaces";
import { loginSchema, signupSchemaServer, customError } from "@notifly/lib";
import { VerificationMail } from "../../verificationEmail/verification";

class AuthService {
  private static hashPassowrd(password: string) {
    return bcrypt.hash(password, 12);
  }

  private static validatePassword(userPassword: string, password: string) {
    return bcrypt.compare(userPassword, password);
  }

  private static createJWTToken(payload: { userId: string; email: string }) {
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    };
    return jwt.sign(payload, secretKey, options);
  }

  private static async sendVerificationMail(verificationToken: string, user: IcreateUser) {
    const verificationURL = `${process.env.CLIENT_DOMAIN}/verification/${verificationToken}`;
    const message = `To verify your user account, kindly click on the verification link, \n including your verification token via the following link: ${verificationURL}. \n If you have already completed the verification process, please disregard this email. \n Thank you.`;

    const mail = await VerificationMail.sendEmail({
      email: user.email,
      subject: "Complete User Account Verification, token valid for 60 min",
      message: message,
    });

    if (!mail)
      throw new GraphQLError("Unable to send email, Please try again later.", {
        extensions: customError.SERVER_ERROR,
      });
    return true;
  }

  //Get User
  public static getUser(email: string) {
    return prismaClient.user.findUnique({ where: { email: email } });
  }

  //Sign User
  public static async createUser(payload: IcreateUser) {
    try {
      const result = signupSchemaServer.safeParse(payload);
      if (!result.success) {
        const error: ZodError = result.error;
        throw new GraphQLError(error.errors[0].message);
      }

      const { userName, name, email, password } = payload;
      const hashPassowrd = await this.hashPassowrd(password);
      const newUser = await prismaClient.user.create({
        data: {
          userName,
          name,
          email,
          password: hashPassowrd,
        },
      });

      if (!newUser)
        throw new GraphQLError("Invalid email or password", {
          extensions: customError.UNAUTHORIZED,
        });

      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

      const now = new Date();
      const userUpdate = await prismaClient.user.update({
        where: { email: email },
        data: {
          passwordResetToken: hashedToken,
          passwordResetTokenExpires: new Date(now.getTime() + 60 * 60 * 1000),
        },
      });
      await this.sendVerificationMail(verificationToken, newUser);
      return {
        status: "Congratulations! You have successfully signed up.",
      };
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new GraphQLError("The provided email address is already in use.", {
            extensions: customError.CONFLICT,
          });
        }
      }

      console.log(error);
      return error;
    }
  }

  //Login User
  public static async loginUser(payload: IloginUser) {
    try {
      const result = loginSchema.safeParse(payload);
      if (!result.success) {
        const error: ZodError = result.error;
        throw new GraphQLError(error.errors[0].message);
      }

      const { email, password } = payload;
      const user = await prismaClient.user.findUnique({ where: { email: email } });
      if (!user)
        throw new GraphQLError("Invalid email or password", {
          extensions: customError.UNAUTHORIZED,
        });

      const passwordVerification = await this.validatePassword(password, user.password);
      if (!passwordVerification)
        throw new GraphQLError("Invalid email or password", {
          extensions: customError.UNAUTHORIZED,
        });

      const token = this.createJWTToken({ userId: user.id, email: user.email });
      return token;
    } catch (error) {
      return error;
    }
  }

  //Forgot Password
  public static async forgotPassword(email: string) {
    try {
      const user = await prismaClient.user.findUnique({ where: { email: email } });
      if (!user)
        throw new GraphQLError("There in no user with this email", {
          extensions: customError.NOT_FOUND,
        });

      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

      const now = new Date();
      const userUpdate = await prismaClient.user.update({
        where: { email: email },
        data: {
          passwordResetToken: hashedToken,
          passwordResetTokenExpires: new Date(now.getTime() + 60 * 60 * 1000),
        },
      });

      await this.sendVerificationMail(verificationToken, user);
      return "Verification token sent to your register email.";
    } catch (error) {
      return error;
    }
  }

  //ResetPassword
  public static async resetPassowrd(payload: { token: string; newPassword: string }) {
    try {
      const { token, newPassword } = payload;
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await prismaClient.user.findUnique({
        where: {
          passwordResetToken: hashedToken,
          passwordResetTokenExpires: { gt: new Date() },
        },
      });

      if (!user)
        throw new GraphQLError("Token Invalid or Expired", {
          extensions: customError.UNAUTHORIZED,
        });

      const hashPassowrd = await this.hashPassowrd(newPassword);
      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          password: hashPassowrd,
          passwordChangedAt: new Date(),
          passwordResetToken: null,
          passwordResetTokenExpires: null,
        },
      });

      const jwtToken = this.createJWTToken({ userId: user.id, email: user.email });
      return jwtToken;
    } catch (error) {
      return error;
    }
  }
}

export default AuthService;
