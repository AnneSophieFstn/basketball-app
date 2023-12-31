import express from "express";
import {
  getAllMatch,
  getOneMatch,
  getMatchByTerrain,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controller/match.controller.js";

const MatchRoutes = express.Router();

MatchRoutes.get("/matchs", getAllMatch);
MatchRoutes.get("/matchs/:id", getOneMatch);
MatchRoutes.get("/matchs/terrain/:terrain_id", getMatchByTerrain);
MatchRoutes.post("/matchs", createMatch);
MatchRoutes.put("/matchs/:id", updateMatch);
MatchRoutes.delete("/matchs/:id", deleteMatch);

export default MatchRoutes;
