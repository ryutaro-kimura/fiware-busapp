// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_API_URL } from "../../secrets";
import AmazonCognitoIdentity, {
  IAuthenticationDetailsData,
  ICognitoUserPoolData
} from "amazon-cognito-identity-js";

const authenticationData: IAuthenticationDetailsData = {
  Username: process.env.NEXT_PUBLIC_USERNAME!,
  Password: process.env.NEXT_PUBLIC_PASSWORD
};
const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
  authenticationData
);
// const poolData: ICognitoUserPoolData = {
//   UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
//   ClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID
// };
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// const userData = {
//   Username: authenticationData.Username,
//   Pool: userPool
// };
// const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

// export const getOrionData = cognitoUser.authenticateUser(
//   authenticationDetails,
//   {
//     onSuccess: async function hoge(result) {
//       const accessToken = result.getAccessToken().getJwtToken();

//       const idToken = result.getIdToken().getJwtToken();
//       console.log(`TOKEN: ${idToken}`);

//       const resp = await fetch(
//         `${process.env.NEXT_PUBLIC_ORION_ENDPOINT}/v2/entities?type=Room`,
//         {
//           headers: {
//             Authorization: idToken
//           }
//         }
//       );
//       const body = await resp.json();
//       return body;
//       console.log(body);
//     },

//     onFailure: function (err) {
//       console.log(`Got Error =======`);
//       console.log(err);
//     }
//   }
// );

// export const apiORION = async () => {
//   const response = await fetch(BASE_API_URL, {});

//   if (response.status !== 200) {
//     const error = await response.text();
//     throw new Error(error);
//   }

//   return await response.json();
// };

// ↑ほぼコピペ-----
export const getGithubId = async () => {
  const url = "https://api.github.com/users/ryutaro-kimura";
  const data = await fetch(url);
  console.log(authenticationData);

  const json = await data.json();
  const githubId: number = json.login;
  return await githubId;
};
