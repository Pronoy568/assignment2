import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", UserControllers.createUser);

router.get("/api/users", UserControllers.getAllUser);

export const UserRoutes = router;
