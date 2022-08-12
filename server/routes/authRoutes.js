import express from "express";
const router = express.Router();

import {
  addUser,
  verifyEmail,
  login,
  updateUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/add-user").post(addUser);
// router.route("/register").post(register);
router.route("/verify").post(verifyEmail);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
