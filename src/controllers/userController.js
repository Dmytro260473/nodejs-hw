import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file uploaded');
    }

    // Завантаження файлу на Cloudinary
    const result = await saveFileToCloudinary(req.file.buffer);

    // Оновлення користувача
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: result.secure_url },
      { new: true }
    );

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({ url: user.avatar });
  } catch (err) {
    next(err);
  }
};
