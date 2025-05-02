import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/database";
import Ofertas from "./Offer";
import User from "./User";

interface PromoCodeAttributes {
  id: number;
  offerId: number;
  userId: number;
  code: string;
  redeem: boolean;
}
interface PromoCodeCreationAttributes
  extends Optional<PromoCodeAttributes, "id"> {}

class PromoCode extends Model<
  PromoCodeAttributes,
  PromoCodeCreationAttributes
> {
  id!: number;
  offerId!: number;
  userId!: number;
  code!: string;
  redeem!: boolean;
}

PromoCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    offerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ofertas,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    redeem: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "promoCode", timestamps: true }
);

export default PromoCode;
