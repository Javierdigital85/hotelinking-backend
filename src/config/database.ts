import { Sequelize } from "sequelize-typescript";
import globalConstants from "../const/globalConstants";

let sequelize: Sequelize;
sequelize = new Sequelize({
  dialect: globalConstants.DIALECT || "mysql",
  host: globalConstants.HOST,
  port: globalConstants.DB_PORT,
  username: globalConstants.DB_USERNAME,
  password: globalConstants.DB_PASSWORD,
  database: globalConstants.DB_NAME,
  logging: false,
});

export default sequelize;
