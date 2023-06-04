import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données établie avec succès !");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
}
