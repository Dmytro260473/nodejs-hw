import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Если ошибка типа http-errors
  if (createHttpError.isHttpError(err)) {
    return res.status(err.status || 500).json({
      message: err.message || 'Http Error',
    });
  }

  // Для всех остальных ошибок
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please, try again!'
      : err.message || 'Internal server error',
  });
};
