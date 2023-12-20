import { Request, Response } from "express";
export interface IcreateUser {
  email?: string | null;
  password?: string | null;
}

export interface IloginUser {
  email: string;
  password: string;
}

export interface ITokenPrice {
  stream: string;
  data: {
    e: string;
    E: number;
    s: string;
    t: number;
    p: string;
    q: string;
    b: number;
    a: number;
    T: number;
    m: boolean;
    M: boolean;
  };
}

export interface IGraphQLContext {
  req: Request;
  res: Response;
  authToken: string;
}
