import express from "express";
const router = express.Router();

import {
  addNotes,
  updateNotes,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController.js";

router.route("/").post(addNotes).get(getAllNotes);
router.route("/:id").delete(deleteNote).patch(updateNotes);

export default router;
