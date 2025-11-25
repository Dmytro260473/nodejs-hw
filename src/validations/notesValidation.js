import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Схема для запроса списка заметок
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().trim().allow("").optional(),
  })
};

// Валидатор ObjectId
const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message("Invalid ID format");
};

// Схема для параметра noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  })
};

// Схема для создания заметки
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().trim().allow("").optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  })
};

// Схема для обновления заметки
export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().trim().allow("").optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }).min(1),

  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  })
};
