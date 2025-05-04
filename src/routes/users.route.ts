import express from "express";
import * as userController from "../controller/users.controller";
import { validateUser } from "../middleware/auth";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user/:id", userController.getSingleUser);
router.get("/me", validateUser, userController.me);
router.post("/logout", userController.logout);

export default router;
