import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Отримати всі нотатки користувача з пагінацією, пошуком та фільтром по тегу
export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;

    const notesQuery = Note.find({ userId: req.user._id });

    if (search && search.trim() !== '') {
      notesQuery.where({ $text: { $search: search } });
    }

    if (tag) {
      notesQuery.where('tags').in([tag]);
    }

    const [totalNotes, notes] = await Promise.all([
      notesQuery.clone().countDocuments(),
      notesQuery.skip(skip).limit(perPageNumber),
    ]);

    const totalPages = Math.ceil(totalNotes / perPageNumber);

    res.status(200).json({
      page: pageNumber,
      perPage: perPageNumber,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (err) {
    next(err);
  }
};

// Отримати одну нотатку за ID
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({
      _id: noteId,
      userId: req.user._id,
    });

    if (!note) throw createHttpError(404, 'Note not found');

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

// Створити нотатку
export const createNote = async (req, res, next) => {
  try {
    const allowedFields = ['title', 'content', 'tags'];
    const newNoteData = { userId: req.user._id };

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) newNoteData[field] = req.body[field];
    });

    const newNote = await Note.create(newNoteData);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

// Оновити нотатку
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const allowedUpdates = ['title', 'content', 'tags'];
    const updateData = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    const noteUpdated = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      updateData,
      { new: true }
    );

    if (!noteUpdated) throw createHttpError(404, 'Note not found');

    res.status(200).json(noteUpdated);
  } catch (err) {
    next(err);
  }
};

// Видалити нотатку
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const noteDeleted = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.user._id,
    });

    if (!noteDeleted) throw createHttpError(404, 'Note not found');

    res.sendStatus(204); // без тіла
  } catch (err) {
    next(err);
  }
};
