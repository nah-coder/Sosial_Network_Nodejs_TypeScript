import { cleanEnv, str } from "envalid";
import Logger from "./logger";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGODB_URI: str(),
  });
};

export default validateEnv;