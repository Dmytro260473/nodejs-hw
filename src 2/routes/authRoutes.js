import { Router } from "express";
import { celebrate, errors } from "celebrate";
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from "../validations/authValidation.js";
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js"; // Твій middleware для JWT

const router = Router();

// Регістрація користувача
router.post("/auth/register", celebrate(registerUserSchema), registerUser);

// Логін користувача
router.post("/auth/login", celebrate(loginUserSchema), loginUser);

// Вихід із системи
router.post("/auth/logout", authenticate, logoutUser);

// Оновлення сесії
router.post("/auth/refresh", authenticate, refreshUserSession);

// Запит на скидання паролю
router.post("/auth/request-reset-email", celebrate(requestResetEmailSchema), requestResetEmail);

// Скидання паролю
router.post("/auth/reset-password", celebrate(resetPasswordSchema), resetPassword);

// Celebrate middleware для обробки помилок валідації
router.use(errors());

export default router;
