import {
  getAllEvenement,
  getOneEvenement,
  getEvenementByTerrain,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../controller/evenement.controller.js";

import express from "express";

const EvenementRoutes = express.Router();

EvenementRoutes.get("/evenements", getAllEvenement);
EvenementRoutes.get("/evenements/:id", getOneEvenement);
EvenementRoutes.get("/evenements/terrain/:terrain_id", getEvenementByTerrain);
EvenementRoutes.post("/evenements", createEvenement);
EvenementRoutes.put("/evenements/:id", updateEvenement);
EvenementRoutes.delete("/evenements/:id", deleteEvenement);

export default EvenementRoutes;
