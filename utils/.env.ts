import dotenv from "dotenv";
dotenv.config();

 function getEnv(name: string): string {
  const value = process.env[name];
  if (!value){
    throw new Error (`Environment variable ${name} is not defined`);
  }
  return value;
  }
export const env = {
  username: getEnv('USERNAME'),
  password: getEnv('PASSWORD'),
  baseUrl: getEnv('BASE_URL'),
};