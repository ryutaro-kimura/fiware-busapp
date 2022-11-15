export const isProd = process.env.NODE_ENV === "production";

export const BASE_API_URL = isProd
  ? `https://orion.dev.saga-city.makeour.city`
  : `https://orion.dev.saga-city.makeour.city`;
