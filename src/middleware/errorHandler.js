import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (createHttpError.isHttpError(err)) {
    // Якщо це HttpError, повертаємо його статус і повідомлення
    return res.status(err.statusCode).json({
      message: err.message || err.name,
    });
  }

  // Для всіх інших помилок повертаємо 500
  console.error(err); // логування помилки на сервері

  res.status(500).json({
    message: isProd ? 'Something went wrong. Please, try again!' : err.message,
  });
};
