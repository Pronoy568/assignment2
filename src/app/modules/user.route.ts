import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", UserControllers.createUser);

router.get("/api/users", UserControllers.getAllUser);

router.get("/api/users/:userId", UserControllers.getUser);

router.put("/api/users/:userId", UserControllers.updateUser);

router.delete("/api/users/:userId", UserControllers.deleteUser);

router.put("/api/users/:userId/orders", UserControllers.addProduct);

router.get("/api/users/:userId/orders", UserControllers.getProduct);

router.get(
  "/api/users/:userId/orders/total-price",
  UserControllers.getTotalPrice
);

export const UserRoutes = router;
