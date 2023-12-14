import { prismaClient } from "@notifly/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { IcreateUser, IloginUser } from "@notifly/lib";
import { loginSchema, signupSchemaServer, customError } from "@notifly/lib";
import { PasswordVerificationMail } from "../../verificationEmail/passwordVerification";
import { VerificationMail } from "../../verificationEmail/verification";

class AuthService {
  private static hashPassowrd(password: string) {
    return bcrypt.hash(password, 12);
  }

  private static validatePassword(userPassword: string, password: string) {
    return bcrypt.compare(userPassword, password);
  }

  private static createJWTToken(payload: { userId: string; email: string; userType: string }) {
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    };
    return jwt.sign(payload, secretKey, options);
  }

  public static verifyJWT(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY || "";
    return new Promise((resolve, rejected) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (!err) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  private static async sendVerificationMail(
    verificationToken: string,
    user: any,
    url: string,
    subject: string,
  ) {
    const verificationURL = `${process.env.CLIENT_DOMAIN}/${url}/${verificationToken}`;

    let mail;
    if (url === "verifyUser") {
      mail = await VerificationMail.sendEmail({
        email: user.email,
        subject: subject,
        clientURL: verificationURL,
      });
    }

    if (url === "resetPassword") {
      mail = await PasswordVerificationMail.sendEmail({
        email: user.email,
        subject: subject,
        clientURL: verificationURL,
      });
    }

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

      const { email, password } = payload;

      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
      const now = new Date();

      const hashPassowrd = await this.hashPassowrd(password || "");
      const newUser = await prismaClient.user.create({
        data: {
          email,
          password: hashPassowrd,
          passwordResetToken: hashedToken,
          passwordResetTokenExpires: new Date(now.getTime() + 60 * 60 * 1000),
        },
      });

      if (!newUser)
        throw new GraphQLError("Invalid email or password", {
          extensions: customError.UNAUTHORIZED,
        });

      const url = "verifyUser";
      const subject = "Complete user account verification, token valid for 24 hours";
      await this.sendVerificationMail(verificationToken, newUser, url, subject);
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
      return error;
    }
  }

  //Login User
  public static async loginUser(payload: IloginUser, context: any) {
    try {
      const result = loginSchema.safeParse(payload);

      if (!result.success) {
        const error: ZodError = result.error;
        throw new GraphQLError(error.errors[0].message);
      }

      const { email, password } = payload;

      const user = await prismaClient.user.findUnique({ where: { email: email } });
      if (!user || !user.password)
        throw new GraphQLError("Invalid email or password", {
          extensions: customError.UNAUTHORIZED,
        });

      const passwordVerification = await this.validatePassword(password, user.password);
      if (!passwordVerification)
        throw new GraphQLError("Invalid email or password", {
          extensions: customError.UNAUTHORIZED,
        });

      const userType = "EmailAuthentication";
      const token = this.createJWTToken({ userId: user.id, email: user.email || "", userType });
      context.res.cookie("AuthToken", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
      });

      return "Successfully logged in";
    } catch (error) {
      return error;
    }
  }

  //Forgot Password
  public static async forgotPassword(email: string) {
    try {
      const user = await prismaClient.user.findUnique({ where: { email: email } });
      if (!user || !user.password)
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
      const url = "resetPassword";
      const subject = "Reset your NotiFly password.";
      await this.sendVerificationMail(verificationToken, user, url, subject);
      return "Password reset token sent to your register email.";
    } catch (error) {
      return error;
    }
  }

  //ResetPassword
  public static async resetPassowrd(payload: { token: string; newPassword: string }, context: any) {
    try {
      const { token, newPassword } = payload;

      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await prismaClient.user.findUnique({
        where: {
          passwordResetToken: hashedToken,
          passwordResetTokenExpires: { gt: new Date() },
        },
      });

      if (!user || !user.password)
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

      const userType = "EmailAuthentication";
      const jwtToken = this.createJWTToken({
        userId: user.id,
        email: user.email as string,
        userType,
      });
      context.res.cookie("AuthToken", jwtToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
      });
      return {
        status: "Password Changed Successully!",
      };
    } catch (error) {
      return error;
    }
  }

  // verify user
  public static async verifyUser(input: { verificationToken: string }, context: any) {
    if (!input.verificationToken)
      throw new GraphQLError("Please provide verification Token", {
        extensions: customError.UNAUTHORIZED,
      });

    const hashedToken = crypto.createHash("sha256").update(input.verificationToken).digest("hex");
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

    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        passwordChangedAt: new Date(),
        passwordResetToken: null,
        passwordResetTokenExpires: null,
        userVerified: true,
      },
    });

    const userType = "EmailAuthentication";
    const token = this.createJWTToken({ userId: user.id, email: user.email as string, userType });
    context.res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
    });

    return {
      message: "You have successfully verified account",
    };
  }

  // UserLogout
  public static async UserLogout(context: any) {
    try {
      if (context.authToken === undefined)
        throw new GraphQLError("Token not found. Logout failed!");

      context.res.cookie("AuthToken", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      return "User is logged out";
    } catch (error) {
      return error;
    }
  }

  // Google login
  public static async googleLogin(input: { email: string; sessionToken?: string }, context: any) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          email: true,
          sessions: {
            select: {
              sessionToken: true,
            },
          },
        },
      });

      if (!user)
        throw new GraphQLError("Token Invalid or Expired", {
          extensions: customError.UNAUTHORIZED,
        });

      const userType = "Google";
      const token = this.createJWTToken({
        userId: user.id,
        email: user.email as string,
        userType: userType,
      });

      context.res.cookie("AuthToken", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
      });

      return token;
    } catch (error) {
      return error;
    }
  }
}

export default AuthService;
