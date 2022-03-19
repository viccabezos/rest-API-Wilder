export interface IProcessenv {
  MONGO_URI: string;
  PORT: string;
  TOTO: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessenv {
      NODE_ENV: "development" | "production";
    }
  }
}
