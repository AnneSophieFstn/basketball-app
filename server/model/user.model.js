import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

console.log("TEST USER MODEL: ", User === sequelize.models.User); // true

export default User;
