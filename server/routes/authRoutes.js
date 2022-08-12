import express from "express";
const router = express.Router();

import {
  addUser,
  verifyEmail,
  login,
  resetUser,
} from "../controllers/authController.js";

router.route("/add-user").post(addUser);
// router.route("/register").post(register);
router.route("/verify/:id").post(verifyEmail);
router.route("/login").post(login);
router.route("/reset-user").patch(resetUser);

export default router;
