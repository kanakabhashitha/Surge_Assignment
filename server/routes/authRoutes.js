import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
  addUser,
  verifyEmail,
  login,
  resetUser,
  getAllUser,
} from "../controllers/authController.js";

router.route("/add-user").post(addUser);
router.route("/verify/:id").post(verifyEmail);
router.route("/login").post(login);
router.route("/reset-user").patch(resetUser);
router.route("/").get(authenticateUser, getAllUser);

export default router;
