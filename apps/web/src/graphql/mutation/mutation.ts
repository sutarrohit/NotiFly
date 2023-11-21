import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;
export const SIGNUP_USER = gql`
  mutation singupUserMutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      status
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPasswordMutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPasswordMutation($token: String, $newPassword: String) {
    resetPassword(token: $token, newPassword: $newPassword) {
      status
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($verificationToken: String) {
    verifyUser(verificationToken: $verificationToken) {
      message
    }
  }
`;
