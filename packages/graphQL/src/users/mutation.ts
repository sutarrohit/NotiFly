export const userMutation = `#graphql   
  createUser(email: String, password:String):SignupResponse
  loginUser(email:String,password:String):String
  forgotPassword(email:String):String
  resetPassword(token:String, newPassword:String):ResetPasswordResponse
  verifyUser(verificationToken:String):verifyUserResponse
`;
