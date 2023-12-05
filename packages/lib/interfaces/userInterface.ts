export interface IcreateUser {
  userName?: string;
  email: string;
  password: string;
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
