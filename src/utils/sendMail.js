import nodemailer from 'nodemailer';

// Налаштування транспортера для SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true для портів 465, false для 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Надсилає лист на email
 * @param {Object} options - Параметри листа
 * @param {string} options.from - Від кого
 * @param {string} options.to - Кому
 * @param {string} options.subject - Тема листа
 * @param {string} options.text - Текст листа
 * @param {string} options.html - HTML листа
 */
export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
