import express from "express";
const router = express.Router();

import {
  register,
  verifyEmail,
  login,
  updateUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/verify").post(verifyEmail);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
