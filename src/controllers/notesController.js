import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    let { page = 1, perPage = 10, tag, search } = req.query;

    page = Number(page) || 1;
    perPage = Math.min(Number(perPage) || 10, 50); // максимум 50 на сторінку
    const skip = (page - 1) * perPage;

    const notesQuery = Note.find({ userId: req.user._id });

    if (search) {
      notesQuery.where({ $text: { $search: search } });
    }

    if (tag) {
      notesQuery.where('tag').equals(tag);
    }

    const [totalNotes, notes] = await Promise.all([
      notesQuery.clone().countDocuments(),
      notesQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({ _id: noteId, userId: req.user._id });
    if (!note) throw createHttpError(404, 'Note not found');

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create({ ...req.body, userId: req.user._id });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });
    if (!deletedNote) throw createHttpError(404, 'Note not found');

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedNote) throw createHttpError(404, 'Note not found');

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};
