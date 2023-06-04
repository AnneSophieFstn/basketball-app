import express from "express";
import connectDB from "../database/database.js";
import UserRoutes from "../routes/user.routes.js";

const app = express();

const port = process.env.PORT || 8000;

//connectDB();

app.use(UserRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
