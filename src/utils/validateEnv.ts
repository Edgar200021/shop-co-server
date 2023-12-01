import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
  DATABASE: str(),
  DATABASE_PASSWORD: str(),
  NODE_ENV: str(),
  JWT_SECRET: str(),
  JWT_LIFETIME: str(),
});
