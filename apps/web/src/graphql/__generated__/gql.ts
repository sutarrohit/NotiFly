/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation loginUserMutation($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password)\n  }\n":
    types.LoginUserMutationDocument,
  "\n  mutation singupUserMutation($email: String!, $password: String!) {\n    createUser(email: $email, password: $password) {\n      status\n    }\n  }\n":
    types.SingupUserMutationDocument,
  "\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n":
    types.ForgotPasswordMutationDocument,
  "\n  mutation resetPasswordMutation($token: String, $newPassword: String) {\n    resetPassword(token: $token, newPassword: $newPassword) {\n      status\n    }\n  }\n":
    types.ResetPasswordMutationDocument,
  "\n  mutation VerifyUser($verificationToken: String) {\n    verifyUser(verificationToken: $verificationToken) {\n      message\n    }\n  }\n":
    types.VerifyUserDocument,
  "\n  mutation GoogleLogin($email: String, $sessionToken: String) {\n    googleLogin(email: $email, sessionToken: $sessionToken)\n  }\n":
    types.GoogleLoginDocument,
  "\n  mutation UserLogout($email: String) {\n    userLogout(email: $email)\n  }\n": types.UserLogoutDocument,
  "\n  query verifyJWT($token: String) {\n    verifyJWT(token: $token)\n  }\n": types.VerifyJwtDocument,
  "\n  query GetUserNotification {\n    getUserNotification {\n      userId\n      token\n      targetPrice\n      notificationType\n      receiverEmail\n      id\n      active\n      CreatedAt\n      DeliveredAt\n    }\n  }\n":
    types.GetUserNotificationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation loginUserMutation($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password)\n  }\n",
): (typeof documents)["\n  mutation loginUserMutation($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation singupUserMutation($email: String!, $password: String!) {\n    createUser(email: $email, password: $password) {\n      status\n    }\n  }\n",
): (typeof documents)["\n  mutation singupUserMutation($email: String!, $password: String!) {\n    createUser(email: $email, password: $password) {\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n",
): (typeof documents)["\n  mutation forgotPasswordMutation($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation resetPasswordMutation($token: String, $newPassword: String) {\n    resetPassword(token: $token, newPassword: $newPassword) {\n      status\n    }\n  }\n",
): (typeof documents)["\n  mutation resetPasswordMutation($token: String, $newPassword: String) {\n    resetPassword(token: $token, newPassword: $newPassword) {\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation VerifyUser($verificationToken: String) {\n    verifyUser(verificationToken: $verificationToken) {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation VerifyUser($verificationToken: String) {\n    verifyUser(verificationToken: $verificationToken) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation GoogleLogin($email: String, $sessionToken: String) {\n    googleLogin(email: $email, sessionToken: $sessionToken)\n  }\n",
): (typeof documents)["\n  mutation GoogleLogin($email: String, $sessionToken: String) {\n    googleLogin(email: $email, sessionToken: $sessionToken)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UserLogout($email: String) {\n    userLogout(email: $email)\n  }\n",
): (typeof documents)["\n  mutation UserLogout($email: String) {\n    userLogout(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query verifyJWT($token: String) {\n    verifyJWT(token: $token)\n  }\n",
): (typeof documents)["\n  query verifyJWT($token: String) {\n    verifyJWT(token: $token)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserNotification {\n    getUserNotification {\n      userId\n      token\n      targetPrice\n      notificationType\n      receiverEmail\n      id\n      active\n      CreatedAt\n      DeliveredAt\n    }\n  }\n",
): (typeof documents)["\n  query GetUserNotification {\n    getUserNotification {\n      userId\n      token\n      targetPrice\n      notificationType\n      receiverEmail\n      id\n      active\n      CreatedAt\n      DeliveredAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
