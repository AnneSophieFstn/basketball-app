import express from "express";
import getAllUser from "../controller/user.controller.js";

const UserRoutes = express.Router();

UserRoutes.get("/users", getAllUser);

export default UserRoutes;
