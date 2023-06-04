import express from "express";
import connectDB from "../database/database.js";

const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
