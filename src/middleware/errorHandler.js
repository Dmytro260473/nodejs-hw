import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Если это ошибка типа http-errors
  if (err instanceof createHttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // Для всех остальных ошибок
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message || 'Internal server error',
  });
};
