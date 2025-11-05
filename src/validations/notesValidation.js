
import {Joi, Segments} from 'celebrate';
import { isValidObjectId } from 'mongoose';
import  {TAGS} from '../constants/tags.js'


export const getAllNotesSchema ={
  [Segments.QUERY]: {
page: Joi.number().integer().min(1).default(1),
perPage: Joi.number().integer().min(5).max(20).default(10),
 tag: Joi.string().valid(...TAGS).optional(),
 search: Joi.string().trim().allow(""),
  }
  }

const objectIdValidator =(value, helpers)=> {
const isValidId = isValidObjectId(value);
return !isValidId ? helpers.message("Invalid ID format") : value;
};

export const noteIdSchema ={
  [Segments.PARAMS]:{
noteId: Joi.string().custom(objectIdValidator).required(),
  }
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(""),
    tag: Joi.string().valid(...TAGS).optional(),
      })
}

export const updateNoteSchema = {
  [Segments.BODY] : Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(""),
    tag: Joi.string().valid(...TAGS).optional(),
      }).min(1),
  [Segments.PARAMS] : {noteId: Joi.string().custom(objectIdValidator).required(),}
}
