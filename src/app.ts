import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import routerConfig from "./routes";
import cookieParser from "cookie-parser";

const allowedOrigins = ["http://localhost:5173"];
const apiConfiguration = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(morgan("tiny"));
};

const routerConfiguration = (app: Application) => {
  app.use("/api", routerConfig());
};

const app = express();
apiConfiguration(app);
routerConfiguration(app);

export default app;
