import pinoHttp from 'pino-http';

export const logger = pinoHttp({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss.l', // додаємо мілісекунди
      ignore: 'pid,hostname',
      messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
      hideObject: process.env.NODE_ENV === 'production', // у dev показуємо об’єкти
    },
  },
});
