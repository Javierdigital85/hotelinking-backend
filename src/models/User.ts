import { DataTypes, Model, Optional, STRING } from "sequelize";
import db from "../config/database";
import bcrypt from "bcryptjs";
import { AllowNull } from "sequelize-typescript";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  salt?: string;
  token?: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "salt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public salt?: string;
  public token!: string | null;
  hash(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.getDataValue("password"));
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "user", timestamps: true }
);

User.beforeCreate(async (user) => {
  const rawPassword = user.getDataValue("password");
  const salt = bcrypt.genSaltSync(8);
  user.setDataValue("salt", salt);
  const hashed = await user.hash(rawPassword, salt);
  user.setDataValue("password", hashed);
});

export default User;
