import { Joi, Segments } from "celebrate";


export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email має бути коректним",
      "any.required": "Email обов'язковий",
    }),
    password: Joi.string().min(8).max(16).required().messages({
      "string.min": "Пароль має бути щонайменше 8 символів",
      "string.max": "Пароль не може бути довше 16 символів",
      "any.required": "Пароль обов'язковий",
    }),
  }),
};


export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email має бути коректним",
      "any.required": "Email обов'язковий",
    }),
    password: Joi.string().required().messages({
      "any.required": "Пароль обов'язковий",
    }),
  }),
};


export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email має бути коректним",
      "any.required": "Email обов'язковий",
    }),
  }),
};


export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.min": "Пароль має бути щонайменше 8 символів",
      "any.required": "Пароль обов'язковий",
    }),
    token: Joi.string().required().messages({
      "any.required": "Токен обов'язковий",
    }),
  }),
};
