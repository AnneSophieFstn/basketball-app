import {
  getAllTerrain,
  getOneTerrain,
  createTerrain,
  updateTerrain,
  deleteTerrain,
} from "../controller/terrain.controller.js";

import express from "express";

const TerrainRoutes = express.Router();

TerrainRoutes.get("/terrains", getAllTerrain);
TerrainRoutes.get("/terrains/:id", getOneTerrain);
TerrainRoutes.post("/terrains", createTerrain);
TerrainRoutes.put("/terrains/:id", updateTerrain);
TerrainRoutes.delete("/terrains/:id", deleteTerrain);

export default TerrainRoutes;
