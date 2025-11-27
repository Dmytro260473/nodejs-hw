import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from "../middleware/multer.js";

const router = Router();

/**
 * PATCH /users/me/avatar
 * Обновление аватара пользователя
 */
router.patch(
  '/users/me/avatar',
  authenticate,
  (req, res, next) => {
    // Используем Multer с обработкой ошибок
    upload.single("avatar")(req, res, (err) => {
      if (err) {
        // Ошибка загрузки файла
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  updateUserAvatar
);

export default router;
