import { Router } from "express";
import {
  getUsers,
  createUser,
  login,
  getUserData,
  updateUser,
  deleteUser,
} from "../controllers";
import {
  verifyUser,
  verifyToken,
  verifyAdmin,
  verifyUpdater,
  getUserByIdor404,
} from "../middlewares";

const router = Router();

router.post("/users", verifyUser, createUser);
router.post("/login", login);
router.get("/users", verifyToken, verifyAdmin, getUsers);
router.get("/users/profile", verifyToken, getUserData);
router.patch("/users/:uuid", verifyToken, verifyUpdater, updateUser);
router.delete("/users/:uuid", verifyToken, getUserByIdor404, deleteUser);

export default router;
