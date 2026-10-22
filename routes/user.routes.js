import express from "express";

import userController from "../controller/user.controller.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);

router.get("/getAll", userController.getAll);

router.post("/login", userController.login);

router.post("/authLogin", auth, userController.authLogin);

router.delete("/deleteUser", auth, userController.deleteUser);

export default router;
