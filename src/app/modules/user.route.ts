import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", UserControllers.createUser);

router.get("/api/users", UserControllers.getAllUser);

router.get("/api/users/:userId", UserControllers.getUser);

router.delete("/api/users/:userId", UserControllers.deleteUser);

router.put("/api/users/:userId", UserControllers.updateUser);

export const UserRoutes = router;
