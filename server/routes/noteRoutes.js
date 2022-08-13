import express from "express";
const router = express.Router();

import {
  addNotes,
  updateNotes,
  deleteNote,
} from "../controllers/noteController.js";

router.route("/").post(addNotes);
router.route("/:id").delete(deleteNote).patch(updateNotes);

export default router;
