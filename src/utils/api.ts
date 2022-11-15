// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_API_URL } from "../../secrets";

// export const apiORION = async () => {
//   const response = await fetch(BASE_API_URL, {});

//   if (response.status !== 200) {
//     const error = await response.text();
//     throw new Error(error);
//   }

//   return await response.json();
// };

const url = "https://api.github.com/users/ryutaro-kimura";

export const getGithubId = async () => {
  const data = await fetch(url);
  console.log(data);
  const json = await data.json();
  const githubId: number = json.login;
  return await githubId;
};
