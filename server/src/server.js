import express from "express";
import connectDB from "../database/database.js";
import MatchRoutes from "../routes/match.routes.js";
import UserRoutes from "../routes/user.routes.js";

const app = express();

const port = process.env.PORT || 8000;

//connectDB();

app.use(UserRoutes);
app.use(MatchRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
