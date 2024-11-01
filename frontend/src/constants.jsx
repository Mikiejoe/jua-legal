const DEV = false;
export const DEV_URL = "http://localhost:8000";
export const PROD_URL = "https://jua-legal-api.vercel.app";
export const BASE_URL = DEV ? DEV_URL : PROD_URL;
export const API_URL = `${BASE_URL}/api/v1`;