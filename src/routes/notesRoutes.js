import { Router } from "express";
import { celebrate } from "celebrate";

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notesController.js";

import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from "../validations/notesValidation.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// защищаем все маршруты
router.use(authenticate);

// GET /notes
router.get("/", celebrate(getAllNotesSchema), getAllNotes);

// GET /notes/:noteId
router.get("/:noteId", celebrate(noteIdSchema), getNoteById);

// POST /notes
router.post("/", celebrate(createNoteSchema), createNote);

// DELETE /notes/:noteId
router.delete("/:noteId", celebrate(noteIdSchema), deleteNote);

// PATCH /notes/:noteId
router.patch("/:noteId", celebrate(updateNoteSchema), updateNote);

export default router;
