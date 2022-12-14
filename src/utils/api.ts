// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { BASE_API_URL } from "../../secrets";
import AmazonCognitoIdentity, {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  IAuthenticationDetailsData,
  ICognitoUserPoolData
} from "amazon-cognito-identity-js";

const authenticationData: IAuthenticationDetailsData = {
  Username: process.env.NEXT_PUBLIC_USERNAME!,
  Password: process.env.NEXT_PUBLIC_PASSWORD
};
const authenticationDetails = new AuthenticationDetails(authenticationData);
const poolData: ICognitoUserPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID!
};
const userPool = new CognitoUserPool(poolData);
const userData = {
  Username: authenticationData.Username,
  Pool: userPool
};
const cognitoUser = new CognitoUser(userData);

export const getOrionData = async () => {
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: async function (result) {
      const accessToken = result.getAccessToken().getJwtToken();

      const idToken = result.getIdToken().getJwtToken();
      console.log(`TOKEN: ${idToken}`);

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_ORION_ENDPOINT}/v2/entities?type=Room`,
        {
          headers: {
            Authorization: idToken
          }
        }
      );
      const body = await resp.json();
      console.log(body);
      return body;
    },

    onFailure: function (err) {
      console.log(`Got Error =======`);
      console.log(err);
    }
  });
};

export const getGithubId = async () => {
  // 環境変数の確認用
  // console.log(authenticationData);

  const url = "https://api.github.com/users/ryutaro-kimura";
  const data = await fetch(url);
  const json = await data.json();
  const githubId: number = json.login;
  return await githubId;
};
