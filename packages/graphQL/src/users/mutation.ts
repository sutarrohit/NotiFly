export const userMutation = `#graphql   
  createUser(userName:String name: String, email: String, password:String):SignupResponse
  loginUser(email:String,password:String):String
  forgotPassword(email:String):String
  resetPassword(token:String, newPassword:String):passwordChangedResponse
`;
