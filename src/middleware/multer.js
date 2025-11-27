import multer from 'multer';
import createHttpError from 'http-errors';

export const upload = multer({
  storage: multer.memoryStorage(), // зберігаємо файл у пам'яті
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(createHttpError(400, 'Only image files are allowed'));
    }
    cb(null, true);
  },
});

