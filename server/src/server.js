import express from "express";
import connectDB from "../database/database.js";
import MatchRoutes from "../routes/match.routes.js";
import UserRoutes from "../routes/user.routes.js";
import EvenementRoutes from "../routes/evenement.routes.js";
import TerrainRoutes from "../routes/terrain.routes.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

//connectDB();

app.use(UserRoutes);
app.use(MatchRoutes);
app.use(EvenementRoutes);
app.use(TerrainRoutes);
/*  */
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
