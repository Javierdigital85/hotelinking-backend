import { Model, DataTypes } from "sequelize";
import db from "../config/database";

class Offer extends Model {}

Offer.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "offer",
    timestamps: true,
  }
);

export default Offer;
