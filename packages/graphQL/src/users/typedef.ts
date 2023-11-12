export const userTypeDefs = `#graphql
type User{
      id:String
      username: String
      name: String
      email: String
      password: String
    }

 type SignupResponse{
  status:String
  token:String
 } 

  type passwordChangedResponse{
  message:String
  token:String
 }     
`;
