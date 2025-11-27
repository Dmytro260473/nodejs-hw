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

const router = Router();

// GET /notes - список нотаток с пагинацией, фильтром и поиском
router.get("/", celebrate(getAllNotesSchema), getAllNotes);

// GET /notes/:noteId - получить одну нотатку по ID
router.get("/:noteId", celebrate(noteIdSchema), getNoteById);

// POST /notes - создать новую нотатку
router.post("/", celebrate(createNoteSchema), createNote);

// DELETE /notes/:noteId - удалить нотатку по ID
router.delete("/:noteId", celebrate(noteIdSchema), deleteNote);

// PATCH /notes/:noteId - обновить существующую нотатку
router.patch("/:noteId", celebrate(updateNoteSchema), updateNote);

export default router;