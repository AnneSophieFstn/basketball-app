import express from "express";
import {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const UserRoutes = express.Router();

UserRoutes.get("/users", getAllUser);
UserRoutes.get("/users/:id", getOneUser);
UserRoutes.post("/users", createUser);
UserRoutes.put("/users/:id", updateUser);
UserRoutes.delete("/users/:id", deleteUser);

export default UserRoutes;
