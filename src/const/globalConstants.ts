import dotenv from "dotenv";
dotenv.config();

if (!process.env.SECRET) {
  throw new Error("SECRET is not defined");
}

interface Config {
  NODE_ENV?: string;
  DIALECT: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  HOST?: string;
  DB_PORT: number;
  PORT: number;
  DB_NAME?: string;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  FRONTEND_URL: string;
  SECRET: string;
}

const config: Config = {
  DIALECT: process.env.DIALECT as
    | "postgres"
    | "mysql"
    | "sqlite"
    | "mariadb"
    | "mssql",
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT) || 5000,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SECRET: process.env.SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};

export default config;

